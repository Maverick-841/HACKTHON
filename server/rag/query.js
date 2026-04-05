import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OllamaEmbeddings } from "@langchain/ollama";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function searchVectorDB(query, filter = undefined) {
  try {
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

    return await db.similaritySearch(query, 100, filter);
  } catch (error) {
    console.warn("Chroma unavailable, using local dataset fallback:", error.message);

    const rawData = await fs.readFile(new URL("./data.json", import.meta.url), "utf8");
    const allItems = JSON.parse(rawData);

    const filterEntries = filter?.$and || [];
    const matchesFilter = (item) => {
      return filterEntries.every((entry) => {
        const [key, expected] = Object.entries(entry)[0] || [];
        if (!key) return true;

        const value = String(item[key] || "").toLowerCase();
        return value === String(expected).toLowerCase();
      });
    };

    return allItems
      .filter(matchesFilter)
      .map((item) => ({
        pageContent: `${item.title}. ${item.description}. Mood:${item.mood}. Language:${item.language}. Category:${item.category}`,
        metadata: item
      }));
  }
}
