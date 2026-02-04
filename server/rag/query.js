import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OllamaEmbeddings } from "@langchain/ollama";

export async function searchVectorDB(query) {

  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text"
  });

  const db = await Chroma.fromExistingCollection(
    embeddings,
    {
      collectionName: "content-db-v2",
      persistDirectory: "./chroma"
    }
  );


  const results = await db.similaritySearch(query, 10);

  return results;
}
