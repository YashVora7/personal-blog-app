const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  await mongoose.connect(process.env.DB_URI);
  console.log("DB Connected Successfully");
};

module.exports = connect;
