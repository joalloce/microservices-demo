import express from "express";

import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "#root/server/controllers/reviewController";
import { requireAuth } from "../../middleware/requireAuth";

const router = express.Router();

router.use(requireAuth);

// id params
router.delete("/:id", deleteReview);

// id params
router.get("/:id", getReview);

router.get("/", getReviews);

// id params
// title and score body
router.patch("/:id", updateReview);

// title and score body
router.post("/", createReview);

export default router;
