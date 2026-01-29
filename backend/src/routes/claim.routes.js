import express from "express";
import Claim from "../models/Claim.js";
import Deal from "../models/Deal.js";
import { auth } from "../middleware/auth.js";
import { verifiedOnly } from "../middleware/verified.js";

const router = express.Router();

// Claim a deal
router.post("/:dealId", auth, async (req, res) => {
  const deal = await Deal.findById(req.params.dealId);
  if (!deal) {
    return res.status(404).json({ message: "Deal not found" });
  }

  if (deal.isLocked) {
    return verifiedOnly(req, res, async () => {
      const exists = await Claim.findOne({
        userId: req.user.id,
        dealId: deal._id
      });

      if (exists) {
        return res.status(400).json({ message: "Deal already claimed" });
      }

      const claim = await Claim.create({
        userId: req.user.id,
        dealId: deal._id
      });

      res.status(201).json(claim);
    });
  }

  const exists = await Claim.findOne({
    userId: req.user.id,
    dealId: deal._id
  });

  if (exists) {
    return res.status(400).json({ message: "Deal already claimed" });
  }

  const claim = await Claim.create({
    userId: req.user.id,
    dealId: deal._id
  });

  res.status(201).json(claim);
});

// Get my claims
router.get("/me", auth, async (req, res) => {
  const claims = await Claim.find({ userId: req.user.id }).populate("dealId");
  res.json(claims);
});

export default router;
