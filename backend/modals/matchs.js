const mongoose = require("mongoose");
const { Schema } = mongoose;
const matchSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter match name"],
    trim: true,
    maxlength: [100, "name never pass 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "please enter match price"],

    maxlength: [4, "price never pass 4 characters"],
    default: 0.0,
  },
  categorie: {
    type: String,
    required: [true, "please enter match categorie"],
    enum: {
      values: ["championnat", "copa", "championsligue"],
    },
  },
  rating: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: [false, "enter ticketNumber for this match"],
    maxlength: [5, "cannot pass 5 characters"],
    default: 0,
  },
  reviwNumber: {
    type: Number,
    required: false,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: false,
      },
      rating: {
        type: String,
        required: false,
      },
      comment: {
        type: String,
        required: false,
      },
    },
  ],
  place: {
    type: String,
    required: [false, "enter the place of   this match"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: false,
  },
  seatsAvailable: {
    type: Number,
    required: false,
  },
});
module.exports = mongoose.model("Match", matchSchema);
