const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { app, server } = require("./socket/index.js");

const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-connect-app.netlify.app",
  "http://192.168.68.172:5173/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
  console.log("Welcome to the API");
});

// api end points

app.use("/api", router);

connectDB().then(() => {
  console.log("MongoDB connected");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
