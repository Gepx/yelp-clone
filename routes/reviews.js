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
  wrapAsync(async (req, res) => {
    const { place_id } = req.params;

    const review = new Review(req.body.review);
    review.author = req.user._id;
    await review.save();

    const place = await Place.findById(place_id);
    place.reviews.push(review);
    await place.save();

    req.flash("success_msg", "Review added successfully!");
    res.redirect(`/places/${place_id}`);
  })
);

router.delete(
  "/:review_id",
  isAuth,
  isAuthorReview,
  isValidObjectId("/places"),
  wrapAsync(async (req, res) => {
    const { place_id, review_id } = req.params;
    await Place.findByIdAndUpdate(place_id, {
      $pull: { reviews: review_id },
    });
    await Review.findByIdAndDelete(review_id);
    req.flash("success_msg", "Review deleted successfully!");
    res.redirect(`/places/${place_id}`);
  })
);

module.exports = router;
