const mongoose = require("mongoose");

const { Schema } = mongoose;
const reservationSchema = new Schema({
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  matchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  checkin: {
    type: Boolean,
    default: false,
  },
  reservationItem: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      ticketPrice: {
        type: Number,
        required: true,
      },
      match: {
        type: Schema.Types.ObjectId,
        ref: "Match",
        required: true,
      },
    },
  ],
  payementInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  payedAt: {
    type: Date,
  },
  ItemPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
