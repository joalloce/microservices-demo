import cors from "cors";
import express from "express";

import accessEnv from "#root/helpers/accessEnv";

const app = express();

const PORT = accessEnv("PORT", 7201);

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`users-service listening on port ${PORT}`);
});
