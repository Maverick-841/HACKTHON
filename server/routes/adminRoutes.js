import express from "express";
import { addToVectorDB } from "../rag/addToVector.js";

const router = express.Router();

router.post("/add-content", async (req, res) => {
  try {

    const item = req.body;

    await addToVectorDB(item);

    res.json({ message: "Content added & embedded" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add" });
  }
});

export default router;