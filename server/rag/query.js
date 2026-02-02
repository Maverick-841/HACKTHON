import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OllamaEmbeddings } from "@langchain/ollama";




export async function searchVectorDB(query) {
  try {
    const embeddings = new OllamaEmbeddings({
      model: "mistral"
    });

    const db = await Chroma.fromExistingCollection(
      embeddings,
      { collectionName: "content-db" }
    );

    const results = await db.similaritySearch(query, 5);
    return results;

  } catch (error) {
    console.error("SEARCH VECTOR ERROR:", error);
    return [];
  }
}