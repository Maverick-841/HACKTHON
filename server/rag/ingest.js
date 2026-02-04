import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OllamaEmbeddings } from "@langchain/ollama";
import fs from "fs";

console.log("🚀 Ingest started...");

const data = JSON.parse(
  fs.readFileSync(new URL("./data.json", import.meta.url), "utf8")
);

const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text"
});


const BATCH_SIZE = 50;

// ---- FIRST BATCH ----
const firstBatch = data.slice(0, BATCH_SIZE).map(item => ({
  pageContent: `${item.title}. ${item.description}. Mood:${item.mood}. Language:${item.language}. Category:${item.category}`,
  metadata: item
}));

console.log("📦 Creating collection with first batch...");

const vectorStore = await Chroma.fromDocuments(
  firstBatch,
  embeddings,
  {
    collectionName: "content-db-v2",
    persistDirectory: "./chroma"
  }
);


// ---- REMAINING BATCHES ----
for (let i = BATCH_SIZE; i < data.length; i += BATCH_SIZE) {
  const batch = data.slice(i, i + BATCH_SIZE).map(item => ({
    pageContent: `${item.title}. ${item.description}. Mood:${item.mood}. Language:${item.language}. Category:${item.category}`,
    metadata: item
  }));

  console.log(`📦 Processing batch ${i / BATCH_SIZE + 1}`);

  await vectorStore.addDocuments(batch);
}

console.log("✅ Data stored in Vector DB successfully");
