import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OllamaEmbeddings } from "@langchain/ollama";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function finalVerify() {
    const embeddings = new OllamaEmbeddings({ model: "nomic-embed-text" });
    const db = await Chroma.fromExistingCollection(embeddings, {
        collectionName: "content-db-v2",
        persistDirectory: path.resolve(__dirname, "chroma")
    });

    const moodInput = "Need Motivation".toLowerCase();
    const languageInput = "Telugu".toLowerCase();
    const categoryInput = "Movies".toLowerCase();

    const query = `${moodInput} ${languageInput} ${categoryInput}`;
    const docs = await db.similaritySearch(query, 100);

    console.log(`\n--- VERIFYING: ${moodInput} | ${languageInput} | ${categoryInput} ---`);

    const filtered = docs.filter(d => {
        const item = d.metadata || {};
        const dbCat = (item.category || "").toLowerCase();
        const dbLang = (item.language || "").toLowerCase();
        const dbMood = (item.mood || "").toLowerCase();

        const matchCat = dbCat === categoryInput;
        const matchLang = dbLang === languageInput;
        const matchMood = dbMood.includes(moodInput) || moodInput.includes(dbMood);

        return matchCat && matchLang && matchMood;
    });

    if (filtered.length > 0) {
        console.log(`PASS: Found ${filtered.length} matching items.`);
        filtered.forEach(f => console.log(` - [${f.metadata.language}] ${f.metadata.title} (${f.metadata.mood})`));
    } else {
        console.log("INFO: No items matched strictly (expected if none in DB).");
    }

    // Check if "River Flow 9" leaked
    const leakage = docs.some(d => d.metadata.title.includes("River Flow 9") &&
        (d.metadata.language.toLowerCase() === "telugu" || filtered.includes(d)));

    if (leakage) {
        console.log("FAIL: Leakage detected!");
    } else {
        const rf9 = docs.find(d => d.metadata.title.includes("River Flow 9"));
        if (rf9) {
            console.log(`INFO: River Flow 9 was found in semantic search but BLOCKED by strict filter (Actual Lang: ${rf9.metadata.language})`);
        }
    }
}

finalVerify();
