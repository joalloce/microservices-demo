import express from "express";

import { getUser, createUser } from "#root/server/controllers/userController";

const router = express.Router();

router.get("/:id", getUser);

router.post("/", createUser);

export default router;
