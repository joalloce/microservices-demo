import axios from "axios";
import accessEnv from "#root/helpers/accessEnv";

const REVIEWS_SERVICE_URI = accessEnv(
  "REVIEWS_SERVICE_URI",
  "http://reviews-service:7200/api/reviews/"
);

export const createReview = async (req, res, next) => {
  try {
    const { title, score, user } = req.body;
    let emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    }
    if (score < -1 && score > 10) {
      emptyFields.push("score");
    }
    if (emptyFields.length) {
      return res
        .status(400)
        .json({ error: "Please fill all the fields correctly", emptyFields });
    }

    let response = await axios.post(`${REVIEWS_SERVICE_URI}`, { ...req.body });

    return res.json(response.data);
  } catch (e) {
    return next(e);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    let response = await axios.delete(`${REVIEWS_SERVICE_URI}${id}`);

    return res.json(response.data);
  } catch (e) {
    return next(e);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    let response = await axios.get(`${REVIEWS_SERVICE_URI}${id}`);

    return res.json(response.data);
  } catch (e) {
    return next(e);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    let response = await axios.get(`${REVIEWS_SERVICE_URI}`);

    return res.json(response.data);
  } catch (e) {
    return next(e);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title, score, user } = req.body;
    let emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    }
    if (score < -1 && score > 10) {
      emptyFields.push("score");
    }
    if (emptyFields.length) {
      return res
        .status(400)
        .json({ error: "Please fill correctly all the fields", emptyFields });
    }

    let response = await axios.patch(`${REVIEWS_SERVICE_URI}${id}`, {
      ...req.body,
    });

    return res.json(response.data);
  } catch (e) {
    return next(e);
  }
};
