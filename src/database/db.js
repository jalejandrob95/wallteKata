const mongoose = require("mongoose");

const options = {
  readPreference: "primary",
  ssl: true,
  connectTimeoutMS: 20000,
  socketTimeoutMS: 20000,
};

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/wallet";

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL, options);
    console.log("📀 Db is connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connect };
