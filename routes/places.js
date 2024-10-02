const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const isValidObjectId = require("../middlewares/isValidObjectId");
const isAuth = require("../middlewares/isAuth");
const { isAuthorPlace } = require("../middlewares/isAuthor");

// models
const Place = require("../models/place");

// schemas
const { placeSchema } = require("../schemas/place");

// controllers
const PlaceController = require("../controllers/places");

const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ErrorHandler(error, 404));
  } else {
    next();
  }
};

router.get("/", wrapAsync(PlaceController.index));

router.get("/create", isAuth, (req, res) => {
  res.render("places/create");
});

router.post("/", isAuth, validatePlace, wrapAsync(PlaceController.store));

router.get("/:id", isValidObjectId("/places"), wrapAsync(PlaceController.show));

router.get(
  "/:id/edit",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  wrapAsync(PlaceController.edit)
);

router.put(
  "/:id",
  isAuth,
  isAuthorPlace,
  validatePlace,
  isValidObjectId("/places"),
  wrapAsync(PlaceController.update)
);

router.delete(
  "/:id",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  wrapAsync(PlaceController.destroy)
);

module.exports = router;
