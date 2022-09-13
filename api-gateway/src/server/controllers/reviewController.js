import axios from "axios";
import accessEnv from "#root/helpers/accessEnv";

const REVIEWS_SERVICE_URI = accessEnv(
  "REVIEWS_SERVICE_URI",
  "http://reviews-service:7200/api/reviews/"
);

export const createReview = async (req, res, next) => {
  try {
    let response = await axios.post(`${REVIEWS_SERVICE_URI}`, { ...req.body });
    res.json(response.data);
  } catch (e) {
    return next(e);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await axios.delete(`${REVIEWS_SERVICE_URI}${id}`);
    res.json(response.data);
  } catch (e) {
    return next(e);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await axios.get(`${REVIEWS_SERVICE_URI}${id}`);
    res.json(response.data);
  } catch (e) {
    return next(e);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    let response = await axios.get(`${REVIEWS_SERVICE_URI}`);
    res.json(response.data);
  } catch (e) {
    return next(e);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await axios.patch(`${REVIEWS_SERVICE_URI}${id}`, {
      ...req.body,
    });
    res.json(response.data);
  } catch (e) {
    return next(e);
  }
};
