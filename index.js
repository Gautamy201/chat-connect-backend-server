const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const { app, server } = require("./socket/index.js");

const allowedOrigins = ["http://localhost:8080/"];
app.use(
  cors({
    origin: "http://localhost:8080/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.use("/api", router);

connectDB().then(() => {
  console.log("MongoDB connected");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
