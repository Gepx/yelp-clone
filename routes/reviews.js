const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const isValidObjectId = require("../middlewares/isValidObjectId");
const router = express.Router({ mergeParams: true });
const isAuth = require("../middlewares/isAuth");
const { validateReview } = require("../middlewares/validator");

// schemas
const { isAuthorReview } = require("../middlewares/isAuthor");

// controller
const ReviewController = require("../controllers/reviews");

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
