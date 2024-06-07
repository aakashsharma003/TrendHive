const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((c) => {
      console.log(`connected to db ${c.connection.host}`);
    })
    .catch((err) => {
      console.log("error occured while connecting to db", err);
    });
};

module.exports = connectDB;
