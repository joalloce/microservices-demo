import axios from "axios";
import jwt from "jsonwebtoken";

import accessEnv from "#root/helpers/accessEnv";

const USERS_SERVICE_URI = accessEnv(
  "USERS_SERVICE_URI",
  "http://users-service:7201/api/users/"
);

const JWT_SECRET = accessEnv("JWT_SECRET", "bad secret");

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  // headers must have auth
  if (!authorization) return res.status(401).json({ error: "Token required" });

  const token = authorization.split(" ")[1]; // second word

  try {
    const { _id } = jwt.verify(token, JWT_SECRET); // get id

    let response = await axios.get(`${USERS_SERVICE_URI}${_id}`); // get user by id to verify if user exists

    req.user = response.data; // pass the user

    next();
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};
