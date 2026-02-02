import express from "express";
import axios from "axios";
import { searchVectorDB } from "../rag/query.js";
const router = express.Router();


router.post("/recommend", async (req, res) => {

  const { mood, languages, category } = req.body;

  const searchQuery =
    `${mood} ${languages.join(" ")} ${category}`;

  const docs = await searchVectorDB(searchQuery);

  const titles = docs.map(d => d.metadata.title);

  res.json({ recommendations: titles });

});

export default router;

