import express from "express";
import mongoose from "mongoose";
import Deal from "../models/Deal.js";

const router = express.Router();

// Get all deals (filters supported)
router.get("/", async (req, res) => {
  const { category, locked, search } = req.query;
  const query = {};

  if (category) query.category = category;
  if (locked !== undefined) query.isLocked = locked === "true";
  if (search) query.title = new RegExp(search, "i");

  const deals = await Deal.find(query);
  res.json(deals);
});

// Get single deal
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid deal id" });
  }

  const deal = await Deal.findById(id);
  if (!deal) {
    return res.status(404).json({ message: "Deal not found" });
  }

  res.json(deal);
});

export default router;
