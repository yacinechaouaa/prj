const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddlware = require("./middlware/error");
// importing routes :
const matchs = require("./routes/matchsrouter");
const auth = require("./routes/auth");
const reservation = require("./routes/reservation");

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());
// setting cloudinary :

app.use("/api/first-view", auth);
app.use("/api/first-view", matchs);
app.use("/api/first-view", reservation);

// middlware errors
app.use(errorMiddlware);
module.exports = app;
