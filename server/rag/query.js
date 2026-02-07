import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OllamaEmbeddings } from "@langchain/ollama";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function searchVectorDB(query, filter = undefined) {

  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text"
  });

  const db = await Chroma.fromExistingCollection(
    embeddings,
    {
      collectionName: "content-db-v2",
      persistDirectory: path.resolve(__dirname, "chroma")
    }
  );

  // Pass filter if provided
  const results = await db.similaritySearch(query, 100, filter);

  return results;
}
