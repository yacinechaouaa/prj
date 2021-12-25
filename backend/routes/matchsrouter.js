const express = require("express");
const router = express.Router();
const {
  getMatchs,
  newMatch,
  getOneMatch,
  updateMatch,
  deleteMatch,
  adminGetAllMatchs,
} = require("../controllers/matchControllers");
const { isAuthtenticated, authorizeRole } = require("../middlware/auth");
router.route("/matchs").get(getMatchs);
router
  .route("/admin/match/new")
  .post(isAuthtenticated, authorizeRole("admin"), newMatch);
router.route("/match/:id").get(getOneMatch);
router
  .route("/admin/match/:id")
  .put(isAuthtenticated, authorizeRole("admin"), updateMatch)
  .delete(isAuthtenticated, authorizeRole("admin"), deleteMatch);
router.route("/admin/matchs").get(adminGetAllMatchs);

module.exports = router;
