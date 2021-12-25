const User = require("../modals/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");
// registering user : api/first-view/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
  sendToken(user, 200, res);
});
// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //checking email and password entered or not
  if (!email || !password) {
    return next(new ErrorHandler("please enter your email and password", 400));
  }
  // finding user in the dataBase :
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("invalid email or password", 401));
  }
  //checking password valid or not :
  const passwordIsValid = await user.comparePassword(password);
  if (!passwordIsValid) {
    return next(new ErrorHandler("invalid email or password", 401));
  }
  sendToken(user, 200, res);
});
// get  currently logged in user profile :
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});
// update and changing user :
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  //checking old password :
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("old password incorrect"));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});
// Update user profile   =>
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// logout user :
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "you had successfully logout",
  });
});
// admin routes :
// admin get all users :
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});
// admin get user Details :
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user not found with that id ", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
//admin update user profile :
exports.adminUpdateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidator: true,
    useFindAndModifie: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});
// admin get   delete user  :
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user not found with that id ", 404));
  }
  await user.remove();
  res.status(200).json({
    success: true,
  });
});
