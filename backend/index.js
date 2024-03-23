import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
// import express from 'express';

dotenv.config();
const app = express();
const port = 6000;
const corsOptions = {
  origin: true,
  credentials: true,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Use the updated __dirname to construct the file path
app.use(express.static(path.join(__dirname, "../front/build")));

// const path = require('path')
// app.use(express.static(path.join(__dirname, '../frontend/build')))

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connected failed");
  }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/tours", tourRoute);
app.use("/users", userRoute);
app.use("/review", reviewRoute);
app.use("/booking", bookingRoute);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../front/build/index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  res.send({ message: "Error occured", payload: err.message });
});

app.listen(port, () => {
  connect();
  console.log("server listening on port", port);
});
