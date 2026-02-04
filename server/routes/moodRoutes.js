import express from "express";
import { searchVectorDB } from "../rag/query.js";

const router = express.Router();

router.post("/recommend", async (req, res) => {
  try {

    const mood = req.body.mood?.toLowerCase();
    const category = req.body.category?.toLowerCase();
    const language = req.body.language?.toLowerCase();


    if (!mood || !category) {
      return res.status(400).json({
        error: "Mood and category required"
      });
    }

    const query = `${mood} ${language} ${category}`;

    const docs = await searchVectorDB(query);

    // ✅ HARD FILTER USING METADATA
    const filtered = docs.filter(d => {
      const item = d.metadata || {};

      const matchMood =
        (item.mood || "").toLowerCase() === mood;

      const matchCategory =
        (item.category || "").toLowerCase() === category;

      const matchLanguage =
        (item.language || "").toLowerCase() === language;

      return matchMood && matchCategory && matchLanguage;
    });

    const finalResults = filtered.length
      ? filtered
      : docs.filter(d =>
        d.metadata.category.toLowerCase() === category &&
        d.metadata.mood.toLowerCase() === mood
      );


    const uniqueMap = new Map();

    finalResults.forEach(d => {
      uniqueMap.set(d.metadata.id, d.metadata);
    });

    res.json({
      recommendations: Array.from(uniqueMap.values())
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Recommendation failed"
    });
  }
});

export default router;
