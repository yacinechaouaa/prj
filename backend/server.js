const dotenv = require("dotenv");

// configuration
dotenv.config({ path: "backend/config/config.env" });
const cloudinary = require("cloudinary");

const app = require("./app");
const connectedData = require("./config/database");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

// handeling uncaught exception  like console.log(a) # a not defined :
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`${err.stack}`);
  process.exit(1);
});

// connection to data base
connectedData();
// listenning to our PORT
app.listen(process.env.PORT, () => {
  console.log(`we are running from ${process.env.PORT}`);
});
