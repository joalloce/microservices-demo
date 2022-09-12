import express from "express";

import {
  login,
  createUser,
  getUsers,
} from "#root/server/controllers/userController";

const router = express.Router();

router.get("/", getUsers);

router.get("/login", login);

router.post("/", createUser);

export default router;
