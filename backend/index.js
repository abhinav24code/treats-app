require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");

// routes
const treatRoutes = require("./routes/Treat");
const groupRoutes = require("./routes/Group");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* API ROUTES */
app.use("/api/treats", treatRoutes);
app.use("/api/groups", groupRoutes);

/* SERVE FRONTEND */
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// fallback for React routes
app.use((req, res, next) => {
  if (req.method !== "GET") return next();

  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
/* ERROR HANDLER */
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
