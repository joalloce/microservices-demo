import axios from "axios";
import accessEnv from "#root/helpers/accessEnv";

const USERS_SERVICE_URI = accessEnv(
  "USERS_SERVICE_URI",
  "http://users-service:7201/api/users/"
);

export const login = async (req, res, next) => {
  try {
    let response = await axios.post(`${USERS_SERVICE_URI}login`, {
      ...req.body,
    });
    res.json(response.data);
  } catch (e) {
    return next(e);
  }
};
export const signup = async (req, res, next) => {
  try {
    let response = await axios.post(`${USERS_SERVICE_URI}`, {
      ...req.body,
    });
    res.json(response.data);
  } catch (e) {
    return next(e);
  }
};
