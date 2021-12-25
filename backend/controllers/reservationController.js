const Reservation = require("../modals/reservation");
const Match = require("../modals/matchs");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlware/catchAsyncErrors");
// create new reservation :
exports.newResevation = catchAsyncErrors(async (req, res, next) => {
  const { reservationItem, payementInfo, ItemPrice, startAt } = req.body;
  const reservation = await Reservation.create({
    reservationItem,
    payementInfo,
    ItemPrice,
    startAt,
    payedAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    reservation,
  });
});
// get single reservation :
exports.getReservation = catchAsyncErrors(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!reservation) {
    return next(new ErrorHandler("not found reservation", 404));
  }
  res.status(200).json({
    success: true,
    reservation,
  });
});
// get my reservations :
exports.myReservations = catchAsyncErrors(async (req, res, next) => {
  const reservations = await Reservation.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    reservations,
  });
});
// admin get all reservations :
exports.allReservations = catchAsyncErrors(async (req, res, next) => {
  const reservations = await Reservation.find();
  let Total = 0;
  reservations.forEach((el) => (Total += el.ItemPrice));
  res.status(200).json({
    success: true,
    reservations,
    Total,
  });
});
