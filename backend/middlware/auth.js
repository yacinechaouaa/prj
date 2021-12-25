const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../modals/user");

// checking user authenticated or not :
exports.isAuthtenticated = catchAsyncErrors(async (req, res, next) => {
  console.log("res", res);
  console.log("req", req);

  const { token } = req.cookies;
  console.log(token, "from auth ");
  if (!token) {
    return next(new ErrorHandler("you have to login first", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});
// handling authorized roles :
exports.authorizeRole = (...roles) => {
  console.log(roles);

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role}  is not allowed to this access`, 403)
      );
    }

    next();
  };
};
