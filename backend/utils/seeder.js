const dotenv = require("dotenv");

const Match = require("../modals/matchs");
const connectData = require("../config/database");
const matchs = require("../data/matchs");

//setting dotenv configuration
dotenv.config({ path: "backend/config/config.env" });
connectData();
const seedMatch = async () => {
  try {
    await Match.deleteMany();
    console.log("matchs deleted");
    await Match.insertMany(matchs);
    console.log("matchs in json file inserted");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};
seedMatch();
