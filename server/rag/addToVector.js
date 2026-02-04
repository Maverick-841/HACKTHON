import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OllamaEmbeddings } from "@langchain/ollama";




export async function addToVectorDB(item) {

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


  const doc = {
    pageContent: `${item.title}. ${item.description}. Mood:${item.mood}. Language:${item.language}. Category:${item.category}`,
    metadata: item
  };

  await db.addDocuments([doc]);

  console.log("✅ Added to Vector DB");
}