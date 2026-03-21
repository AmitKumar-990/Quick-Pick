import express from "express";
import {
  createPoll,
  getPolls,
  votePoll
} from "../controllers/pollController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createPoll);
router.get("/", getPolls);
router.post("/:id/vote", protect, votePoll);

export default router;