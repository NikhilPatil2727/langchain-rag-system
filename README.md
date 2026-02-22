# 📄 Research Paper RAG

A simple Retrieval-Augmented Generation (RAG) system built to interact with research papers.

Instead of manually scrolling through long PDFs, this project allows asking questions directly from the document and getting context-aware answers using embeddings and vector search.

---

## 🚀 Features

- 📄 Process research paper PDFs
- ✂️ Intelligent text chunking
- 🔎 Semantic search using embeddings
- 🧠 Context-aware answers using LLM
- ⚡ Fast retrieval with vector database

---

## 🛠 Tech Stack

- **Frontend:** Next.js
- **Backend:** Next.js API Routes
- **LLM Framework:** LangChain
- **Architecture:** RAG (Retrieval-Augmented Generation)
- **Vector Database:** Pinecone (or mention what you used)
- **Embeddings:** OpenAI Embeddings
- **LLM:** OpenAI GPT Model

---

## 🧠 How It Works

PDF → Text Chunking → Embeddings → Vector Store → Similarity Search → LLM → Final Answer

1. The research paper PDF is loaded.
2. Text is split into manageable chunks.
3. Embeddings are generated for each chunk.
4. Embeddings are stored in a vector database.
5. User asks a question.
6. Relevant chunks are retrieved using similarity search.
7. The LLM generates an answer using retrieved context.

---

## 🎯 Why I Built This

I built this project for myself to better understand research papers without manually searching through long documents.

This helped me understand:

- How embeddings work
- How vector search retrieves context
- How RAG pipelines are structured
- How LLMs generate grounded responses

---

## 🔮 Future Improvements

- Improve chunking strategy
- Add streaming responses
- Multi-document support
- Improve retrieval accuracy
- Add citation support

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/your-username/research-paper-rag.git
cd research-paper-rag
npm install
