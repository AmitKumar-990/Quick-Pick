import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 }
});

const pollSchema = new mongoose.Schema({
  question: String,
  options: [optionSchema],
  expiresAt: Date,

  voters: [
    {
      userId: String,
      optionIndex: Number
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Poll", pollSchema);