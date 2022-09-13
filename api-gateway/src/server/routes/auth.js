import express from "express";

import { login, signup } from "#root/server/controllers/authController";

const router = express.Router();

// email and password body
router.post("/login", login);

// name, email, and password body
router.post("/signup", signup);

export default router;
