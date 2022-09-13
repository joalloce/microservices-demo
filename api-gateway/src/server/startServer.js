import cors from "cors";
import express from "express";

import accessEnv from "#root/helpers/accessEnv";
import { default as reviewsRouter } from "#root/server/routes/reviews";
import { default as authRouter } from "#root/server/routes/auth";

const PORT = accessEnv("PORT", 7100);

const app = express();

//middlewares
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

app.use(express.json());

//review and auth router
app.use("/api/auth", authRouter);
app.use("/api/reviews", reviewsRouter);

app.listen(PORT, () => {
  console.log(`api-gateway listening on port ${PORT}`);
});
