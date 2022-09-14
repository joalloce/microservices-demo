import axios from "axios";
import accessEnv from "#root/helpers/accessEnv";
import jwt from "jsonwebtoken";

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

    if (response.data.error) {
      return res.status(400).json(response.data);
    }

    const token = createToken(response.data.id);

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

    if (response.data.error) {
      return res.status(400).json(response.data);
    }

    const token = createToken(response.data.id);

    return res.json({
      name: response.data.name,
      token,
      id: response.data.id,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
