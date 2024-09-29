const ejsMate = require("ejs-mate");
const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const wrapAsync = require("./utils/wrapAsync");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// connect to mongoDB
mongoose
  .connect("mongodb://127.0.0.1/bestpoints")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/places", require("./routes/places"));
app.use("/places/:place_id/reviews", require("./routes/reviews"));

app.all("*", (req, res, next) => {
  next(new ErrorHandler("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
  // res.status(statusCode).send("Something Broke!");
});

// app.get("/seed/place", async (req, res) => {
//   const place = new Place({
//     title: "Emprire State Building",
//     price: "$99999999",
//     description: "A great building",
//     location: "New York, NY",
//   });

//   await place.save();
//   res.send(place);
// });

app.listen(3000, () => {
  console.log(`server is running on http://127.0.0.1:3000`);
});
