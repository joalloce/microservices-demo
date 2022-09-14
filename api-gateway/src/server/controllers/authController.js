import axios from "axios";
import jwt from "jsonwebtoken";

import accessEnv from "#root/helpers/accessEnv";

const USERS_SERVICE_URI = accessEnv(
  "USERS_SERVICE_URI",
  "http://users-service:7201/api/users/"
);

const JWT_SECRET = accessEnv("JWT_SECRET", "bad secret");

const createToken = (id) => {
  return jwt.sign({ _id: id }, JWT_SECRET, { expiresIn: "1d" });
};

export const login = async (req, res, next) => {
  try {
    let response = await axios.post(`${USERS_SERVICE_URI}login`, {
      ...req.body,
    });

    // check if there is an error
    if (response.data.error) {
      return res.status(400).json(response.data);
    }

    const token = createToken(response.data.id); // token created

    return res.json({
      name: response.data.name,
      token,
      id: response.data.id,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
export const signup = async (req, res, next) => {
  try {
    let response = await axios.post(`${USERS_SERVICE_URI}`, {
      ...req.body,
    });

    // check if there is an error
    if (response.data.error) {
      return res.status(400).json(response.data);
    }

    const token = createToken(response.data.id); // token created

    return res.json({
      name: response.data.name,
      token,
      id: response.data.id,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
