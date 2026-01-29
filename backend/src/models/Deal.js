import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    partnerName: { type: String, required: true },
    category: { type: String, required: true, index: true },
    isLocked: { type: Boolean, default: false },
    eligibilityText: String,
    discountValue: String
  },
  { timestamps: true }
);

export default mongoose.model("Deal", dealSchema);
