const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDB successfully!");
    });
    connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });
  } catch (err) {
    console.error(`Check internet connection`);
  }
}

module.exports = connectDB;
