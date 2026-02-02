import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OllamaEmbeddings } from "@langchain/ollama";


import fs from "fs";

const data = JSON.parse(
  fs.readFileSync("./rag/data.json", "utf8")
);

const embeddings = new OllamaEmbeddings({
  model: "mistral"
});

const docs = data.map(item => ({
  pageContent: `${item.title}. ${item.description}. Mood:${item.mood}. Language:${item.language}. Category:${item.category}`,
  metadata: item
}));

const vectorStore = await Chroma.fromDocuments(
  docs,
  embeddings,
  { collectionName: "content-db" }
);

console.log("✅ Data stored in Vector DB");