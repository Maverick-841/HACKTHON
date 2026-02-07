import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OllamaEmbeddings } from "@langchain/ollama";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkMetadata() {
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

    const results = await db.similaritySearch("River Flow 9", 20);
    const target = results.find(d => d.metadata.title.includes("River Flow 9"));

    if (target) {
        console.log("MATCH FOUND:");
        console.log(JSON.stringify(target.metadata, null, 2));
    } else {
        console.log("River Flow 9 NOT FOUND in top 20 results.");
        // Show what WAS found to see metadata structure
        console.log("TOP MATCH METADATA:");
        console.log(JSON.stringify(results[0].metadata, null, 2));
    }
}

checkMetadata();
