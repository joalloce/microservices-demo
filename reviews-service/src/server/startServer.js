import cors from "cors";
import express from "express";

import accessEnv from "#root/helpers/accessEnv";

const PORT = accessEnv("PORT", 7200);

const app = express();

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`reviews-service listening on port ${PORT}`);
});
