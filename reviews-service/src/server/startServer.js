import cors from "cors";
import express from "express";

import accessEnv from "#root/helpers/accessEnv";
import router from "#root/server/routes/reviews";

const PORT = accessEnv("PORT", 7200);

const app = express();

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

app.use(express.json());

app.use("api/reviews", router);

app.listen(PORT, () => {
  console.log(`reviews-service listening on port ${PORT}`);
});
