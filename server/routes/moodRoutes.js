import express from "express";
import { searchVectorDB } from "../rag/query.js";

const router = express.Router();

router.post("/recommend", async (req, res) => {

  try {
    const { mood, languages = [], category } = req.body;

    const query = `${mood} ${languages.join(" ")} ${category}`;

    const docs = await searchVectorDB(query);

    // ✅ HARD FILTER USING METADATA
    const filtered = docs.filter(d => {

      const item = d.metadata;

      const matchMood = item.mood === mood;

      const matchCategory =
        item.category.toLowerCase() === category.toLowerCase();

      const matchLanguage =
        languages.length === 0 ||
        languages.includes(item.language);

      return matchMood && matchCategory && matchLanguage;
    });

    res.json({
      recommendations: filtered.map(d => d.metadata)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Recommendation failed" });
  }

});

export default router;
