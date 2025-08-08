require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB  = require("./config/db");

const authRoutes = require("./routes/authRoutes");






app.use("/uploads", express.static(path.join(__dirname, "uploads")));