import express from "express";

import {
  createReview,
  getReview,
  getReviews,
  updateReview,
} from "#root/server/controllers/reviewController";

const router = express.Router();

router.get("/:id", getReview);
router.get("/", getReviews);
router.patch("/:id", updateReview);
router.post("/", createReview);

export default router;
