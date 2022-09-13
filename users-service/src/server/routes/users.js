import express from "express";

import {
  login,
  createUser,
  getUsers,
} from "#root/server/controllers/userController";

const router = express.Router();

router.get("/", getUsers);

// email and password body
router.post("/login", login);

// email, name, and password body
router.post("/", createUser);

export default router;
