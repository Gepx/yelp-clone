const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

placeSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

module.exports = mongoose.model("Place", placeSchema);
