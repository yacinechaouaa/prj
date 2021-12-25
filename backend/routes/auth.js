const express = require("express");
const { isAuthtenticated, authorizeRole } = require("../middlware/auth");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  adminUpdateUser,
  deleteUser,
} = require("../controllers/authController");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthtenticated, getUserProfile);
router.route("/password/update").put(isAuthtenticated, updatePassword);
router.route("/me/update").put(isAuthtenticated, updateProfile);
// admin routes :
router
  .route("/admin/allUsers")
  .get(isAuthtenticated, authorizeRole("admin"), allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthtenticated, authorizeRole("admin"), getUserDetails)
  .put(isAuthtenticated, authorizeRole("admin"), adminUpdateUser)
  .delete(isAuthtenticated, authorizeRole("admin"), deleteUser);
module.exports = router;
