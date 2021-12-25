const Match = require("../modals/matchs");
const ErrorHandler = require("../utils/errorHandler");
catchAsyncErrors = require("../middlware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
// creating new match annonce
exports.newMatch = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "matchs",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const match = await Match.create(req.body);

  res.status(201).json({
    success: true,
    match,
  });
});
// get all matchs => /api/first-view/matchs?keyword=ca?page=2

exports.getMatchs = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 8; // nheb 4 matchs ybenou f kol page
  const matchCount = await Match.countDocuments(); // we need this in the front end
  const APIFeatures = new ApiFeatures(Match.find(), req.query)

    .search()
    .filter()
    .pagination(resPerPage);
  const matchs = await APIFeatures.query;
  setTimeout(() => {
    res.status(200).json({
      success: true,
      count: matchs.length,
      matchCount,
      resPerPage,
      matchs,
    });
  }, 1500);
});
// get one match by id
exports.getOneMatch = catchAsyncErrors(async (req, res, next) => {
  const thismatch = await Match.findById(req.params.id);
  if (!thismatch) {
    return next(new ErrorHandler("match not found", 404));
  }
  res.status(200).json({
    thismatch,
  });
});
// update match :
exports.updateMatch = catchAsyncErrors(async (req, res, next) => {
  let match = await Match.findById(req.params.id);

  if (!match) {
    return next(new ErrorHandler("Match not found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the match
    for (let i = 0; i < match.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        match.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "matchs",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  match = await Match.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    match,
  });
});
// delete match :
exports.deleteMatch = catchAsyncErrors(async (req, res, next) => {
  const match = await Match.findById(req.params.id);

  if (!match) {
    return next(new ErrorHandler("Match not found", 404));
  }

  // Deleting images associated with the product
  for (let i = 0; i < match.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      match.images[i].public_id
    );
  }

  await match.remove();

  res.status(200).json({
    success: true,
    message: "match is deleted.",
  });
});

// Get all matchs (Admin)  =>
exports.adminGetAllMatchs = catchAsyncErrors(async (req, res, next) => {
  const matchs = await Match.find();

  res.status(200).json({
    success: true,
    matchs,
  });
});
