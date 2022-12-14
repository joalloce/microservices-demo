import express from "express";

import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "#root/server/controllers/reviewController";

const router = express.Router();

// id params
router.delete("/:id", deleteReview);

// id params
router.get("/:id", getReview);

router.get("/", getReviews);

// id params
// score, title, and user body
router.patch("/:id", updateReview);

// score, title, and user body
router.post("/", createReview);

export default router;
