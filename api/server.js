// api/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/tasks");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/task", taskRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log("🚀 Server running on http://0.0.0.0:3001");
});

  })
  .catch((err) => console.error("MongoDB connection error:", err));
