const mongoose = require("mongoose");
const connectData = () => {
  mongoose
    .connect(process.env.mongoURI, {
      useNewUrlParser: true,
    })
    .then((con) => {
      console.log(`data connected from HOST : ${con.connection.host}`);
    });
};
module.exports = connectData;
