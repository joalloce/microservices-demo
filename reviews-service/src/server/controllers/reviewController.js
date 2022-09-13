import { Review } from "#root/db/models/reviewModel";

export const createReview = async (req, res, next) => {
  try {
    const { title, score, user } = req.body;
    const review = await Review.create({ title, score, user });
    return res.json(review);
  } catch (e) {
    return next(e);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ok = await Review.destroy({ where: { id } });
    if (!ok) return next(new Error("Invalid id"));
    return res.json(ok);
  } catch (e) {
    return next(e);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) return next(new Error("Invalid id"));
    return res.json(review);
  } catch (e) {
    return next(e);
  }
};

export const getReviews = async (req, res, next) => {
  const reviews = await Review.findAll();
  return res.json(reviews);
};

export const updateReview = async (req, res, next) => {
  try {
    const { title, score, user } = req.body;
    const { id } = req.params;
    const ok = await Review.update(
      { title, score, user },
      {
        where: {
          id,
        },
      }
    );
    if (!ok) return next(new Error("Invalid update"));
    return res.json(ok);
  } catch (e) {
    return next(e);
  }
};
