import 'dotenv/config';

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenAI } from '@google/genai';
import { Pinecone } from '@pinecone-database/pinecone';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

/* -----------------------------
   Path setup
------------------------------ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -----------------------------
   Validate ENV
------------------------------ */
const requiredEnvVars = ['GEMINI_API_KEY', 'PINECONE_API_KEY', 'PINECONE_INDEX_NAME'];
for (const key of requiredEnvVars) {
  if (!process.env[key]) throw new Error(`❌ ${key} missing in .env`);
}

/* -----------------------------
   Config — tweak these as needed
------------------------------ */
const CONFIG = {
  CHUNK_SIZE: 512,
  CHUNK_OVERLAP: 100,
  EMBED_CONCURRENCY: 3,       // parallel embed calls (safe for Gemini free tier)
  PINECONE_BATCH_SIZE: 100,   // max vectors per Pinecone upsert
  EMBED_DELAY_MS: 300,        // delay between parallel batches
  MAX_RETRIES: 5,
  SOURCE_FILE: 'ResearchPaper.pdf',
  NAMESPACE: process.env.PINECONE_NAMESPACE || 'default',
  CHECKPOINT_FILE: path.join(process.cwd(), '.indexing_checkpoint.json'),
};

/* -----------------------------
   Clients
------------------------------ */
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

/* -----------------------------
   Utilities
------------------------------ */
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

function sanitizeText(text, maxChars = 1000) {
  return text
    .replace(/\x00/g, '')                        // null bytes — Pinecone killer #1
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, ' ')  // strip non-printable chars
    .replace(/\s+/g, ' ')                         // collapse whitespace
    .trim()
    .slice(0, maxChars);
}

/* -----------------------------
   Checkpoint — resume on crash
------------------------------ */
function loadCheckpoint() {
  try {
    if (fs.existsSync(CONFIG.CHECKPOINT_FILE)) {
      const data = JSON.parse(fs.readFileSync(CONFIG.CHECKPOINT_FILE, 'utf-8'));
      console.log(`📌 Checkpoint found — resuming from chunk ${data.lastCompletedIndex + 1}`);
      return data;
    }
  } catch (_) {}
  return { lastCompletedIndex: -1 };
}

function saveCheckpoint(lastCompletedIndex) {
  fs.writeFileSync(CONFIG.CHECKPOINT_FILE, JSON.stringify({ lastCompletedIndex }, null, 2));
}

function clearCheckpoint() {
  if (fs.existsSync(CONFIG.CHECKPOINT_FILE)) fs.unlinkSync(CONFIG.CHECKPOINT_FILE);
  console.log('🧹 Checkpoint cleared');
}

/* -----------------------------
   Embed with retry + rate-limit handling
------------------------------ */
async function embedText(text, chunkId) {
  for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: [{ parts: [{ text }] }],
      });

      const values = response.embeddings?.[0]?.values;
      if (!values || values.length !== 3072) throw new Error(`Bad dimensions: ${values?.length}`);
      return values;

    } catch (err) {
      const isRateLimit = err.message?.includes('429') || err.message?.includes('quota');
      const waitMs = isRateLimit ? 10000 * attempt : 1500 * attempt;

      console.warn(`  ⚠️  [Chunk ${chunkId}] Attempt ${attempt}/${CONFIG.MAX_RETRIES}: ${err.message}`);

      if (attempt === CONFIG.MAX_RETRIES) {
        console.error(`  ❌ [Chunk ${chunkId}] All retries exhausted — skipping chunk`);
        return null;
      }

      console.log(`  ⏳ Waiting ${waitMs / 1000}s...`);
      await sleep(waitMs);
    }
  }
}

/* -----------------------------
   Embed a small batch in parallel
------------------------------ */
async function embedParallelBatch(chunks, globalStartIndex) {
  const results = await Promise.all(
    chunks.map(async (chunk, i) => {
      const idx = globalStartIndex + i;
      const text = sanitizeText(chunk.pageContent);

      if (text.length < 50) return null; // skip junk chunks (headers, page numbers)

      const values = await embedText(text, idx);
      if (!values) return null;

      return {
        id: `${CONFIG.SOURCE_FILE}-chunk-${idx}`, // deterministic — safe to re-run
        values,
        metadata: {
          source: CONFIG.SOURCE_FILE,
          chunkIndex: idx,
          page: chunk.metadata?.loc?.pageNumber ?? chunk.metadata?.page ?? 0,
          text: sanitizeText(text, 1000),
        },
      };
    })
  );

  return results.filter(Boolean);
}

/* -----------------------------
   Upload vectors to Pinecone
------------------------------ */
async function uploadToPinecone(vectors) {
  const batches = chunkArray(vectors, CONFIG.PINECONE_BATCH_SIZE);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    let success = false;

    for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
      try {
        await index.namespace(CONFIG.NAMESPACE).upsert(batch);
        console.log(`  📦 Pinecone batch ${i + 1}/${batches.length} ✅ (${batch.length} vectors)`);
        success = true;
        break;
      } catch (err) {
        console.warn(`  ⚠️  Pinecone batch ${i + 1} attempt ${attempt}: ${err.message}`);
        if (attempt < CONFIG.MAX_RETRIES) await sleep(2000 * attempt);
      }
    }

    if (!success) {
      // Last resort: upload one by one to salvage the batch
      console.log('  🔁 Retrying one-by-one...');
      for (const vector of batch) {
        try {
          await index.namespace(CONFIG.NAMESPACE).upsert([vector]);
        } catch (e) {
          console.error(`    ❌ Skipping ${vector.id}: ${e.message}`);
        }
      }
    }
  }
}

/* -----------------------------
   Main
------------------------------ */
async function indexing() {
  console.log('🚀 Starting optimized PDF indexing...\n');

  /* ── Step 1: Load PDF ── */
  const pdfPath = path.join(__dirname, '..', 'public', CONFIG.SOURCE_FILE);
  console.log('📄 Loading PDF:', pdfPath);

  const loader = new PDFLoader(pdfPath, { splitPages: true });
  const rawDocs = await loader.load();
  if (!rawDocs.length) throw new Error('No content found in PDF');
  console.log(`📚 Pages loaded: ${rawDocs.length}\n`);

  /* ── Step 2: Split into chunks ── */
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CONFIG.CHUNK_SIZE,
    chunkOverlap: CONFIG.CHUNK_OVERLAP,
    separators: ['\n\n', '\n', '. ', ' ', ''],
  });

  const allChunks = await splitter.splitDocuments(rawDocs);
  console.log(`✂️  Total chunks: ${allChunks.length}\n`);

  /* ── Step 3: Resume from checkpoint if exists ── */
  const checkpoint = loadCheckpoint();
  const startFrom = checkpoint.lastCompletedIndex + 1;

  if (startFrom >= allChunks.length) {
    console.log('✅ All chunks already indexed! Delete .indexing_checkpoint.json to re-index.');
    return;
  }

  const remainingChunks = allChunks.slice(startFrom);
  console.log(`🧩 Chunks to embed: ${remainingChunks.length} (starting at index ${startFrom})\n`);

  /* ── Step 4: Embed in parallel batches ── */
  console.log(`🧠 Embedding (concurrency: ${CONFIG.EMBED_CONCURRENCY})...\n`);

  const parallelGroups = chunkArray(remainingChunks, CONFIG.EMBED_CONCURRENCY);
  const allVectors = [];

  for (let g = 0; g < parallelGroups.length; g++) {
    const group = parallelGroups[g];
    const globalStart = startFrom + g * CONFIG.EMBED_CONCURRENCY;

    const vectors = await embedParallelBatch(group, globalStart);
    allVectors.push(...vectors);

    // Upload incrementally every 500 vectors to avoid memory buildup on huge PDFs
    if (allVectors.length >= 500) {
      console.log(`\n⬆️  Incremental upload triggered (${allVectors.length} vectors ready)...`);
      await uploadToPinecone([...allVectors]);
      allVectors.length = 0; // clear after upload
    }

    const processed = Math.min(startFrom + (g + 1) * CONFIG.EMBED_CONCURRENCY, allChunks.length);
    const pct = ((processed / allChunks.length) * 100).toFixed(1);
    console.log(`📈 Progress: ${processed}/${allChunks.length} (${pct}%)`);

    // Save checkpoint after each group
    saveCheckpoint(Math.min(globalStart + group.length - 1, allChunks.length - 1));

    if (g < parallelGroups.length - 1) await sleep(CONFIG.EMBED_DELAY_MS);
  }

  /* ── Step 5: Upload any remaining vectors ── */
  if (allVectors.length > 0) {
    console.log(`\n📦 Uploading final ${allVectors.length} vectors to Pinecone...\n`);
    await uploadToPinecone(allVectors);
  }

  /* ── Step 6: Verify ── */
  console.log('\n🔍 Verifying Pinecone index...');
  try {
    const stats = await index.describeIndexStats();
    const nsVectors = stats.namespaces?.[CONFIG.NAMESPACE]?.vectorCount;
    console.log(`  ✅ Vectors in "${CONFIG.NAMESPACE}" namespace: ${nsVectors ?? 'N/A'}`);
    console.log(`  📊 Total index vectors: ${stats.totalVectorCount}`);
  } catch (e) {
    console.warn('  ⚠️  Could not verify index stats:', e.message);
  }

  /* ── Done ── */
  clearCheckpoint();
  console.log('\n🎉 INDEXING COMPLETE');
  console.log(`   📁 File      : ${CONFIG.SOURCE_FILE}`);
  console.log(`   🗂️  Namespace : ${CONFIG.NAMESPACE}`);
  console.log(`   ✂️  Chunks    : ${allChunks.length}`);
}

indexing().catch((err) => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});