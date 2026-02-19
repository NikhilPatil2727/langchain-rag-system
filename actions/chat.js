'use server';

import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import { getEmbeddings, getModel, getPineconeIndex } from '@/lib/config';

export async function askQuestion(question) {
  try {
    const embeddings = getEmbeddings();
    const queryVector = await embeddings.embedQuery(question);

    const pineconeIndex = getPineconeIndex();

    const searchResults = await pineconeIndex.query({
      topK: 20,
      vector: queryVector,
      includeMetadata: true,
    });

    if (!searchResults.matches || searchResults.matches.length === 0) {
      return {
        success: true,
        answer: "I don't have enough information to answer that question.",
        sources: 0,
      };
    }

    // Filter weak matches
    const filteredMatches = searchResults.matches.filter(
      (match) => match.score > 0.7
    );

    if (filteredMatches.length === 0) {
      return {
        success: true,
        answer: "I don't have enough information to answer that question.",
        sources: 0,
      };
    }

    const context = filteredMatches
      .map((match) => match.metadata?.text || "")
      .join("\n\n---\n\n");

    const promptTemplate = PromptTemplate.fromTemplate(`
You are a helpful assistant answering questions based strictly on the provided documentation.

Context:
{context}

Question:
{question}

Instructions:
- Use ONLY the context above
- If not present, say you don't have enough information
- Be clear and concise
- Use code examples if available

Answer:
`);

    const model = getModel();

    const chain = RunnableSequence.from([
      promptTemplate,
      model,
      new StringOutputParser(),
    ]);

    const answer = await chain.invoke({
      context,
      question,
    });

    return {
      success: true,
      answer,
      sources: filteredMatches.length,
    };
  } catch (error) {
    console.error("Chat error:", error);

    return {
      success: false,
      answer: "Something went wrong. Please try again.",
    };
  }
}
