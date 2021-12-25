const express = require("express");
const router = express.Router();
const {
  newResevation,
  getReservation,
  myReservations,
  allReservations,
  userseats,
} = require("../controllers/reservationController");
const { isAuthtenticated, authorizeRole } = require("../middlware/auth");
router.route("/reservation/new").post(isAuthtenticated, newResevation);
router.route("/reservation/:id").get(isAuthtenticated, getReservation);
router.route("/reservations/me").get(isAuthtenticated, myReservations);
router
  .route("/admin/allreservations")
  .get(isAuthtenticated, authorizeRole("admin"), allReservations);

module.exports = router;
