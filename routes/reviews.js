const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const wrapAsync = require("../utils/wrapAsync");
const isValidObjectId = require("../middlewares/isValidObjectId");
const router = express.Router({ mergeParams: true });
const isAuth = require("../middlewares/isAuth");

// models
const Place = require("../models/place");
const Review = require("../models/review");

// schemas
const { reviewSchema } = require("../schemas/review");
const { isAuthorReview } = require("../middlewares/isAuthor");

// controller
const ReviewController = require("../controllers/reviews");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ErrorHandler(error, 404));
  } else {
    next();
  }
};

router.post(
  "/",
  isAuth,
  validateReview,
  isValidObjectId("/places"),
  wrapAsync(ReviewController.store)
);

router.delete(
  "/:review_id",
  isAuth,
  isAuthorReview,
  isValidObjectId("/places"),
  wrapAsync(ReviewController.destroy)
);

module.exports = router;
