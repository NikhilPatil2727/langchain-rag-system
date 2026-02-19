import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";

export function getEmbeddings() {
  return new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-embedding-001", // MUST match indexing
  });
}

export function getModel() {
  return new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0.2,
  });
}

export function getPineconeIndex() {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

  // VERY IMPORTANT: namespace must match indexing
  return index.namespace(process.env.PINECONE_NAMESPACE || "default");
}
