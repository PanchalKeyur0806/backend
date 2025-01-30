// INSTALLED PACKAGES
const cors = require("cors");
const express = require("express");
const path = require("path");
// TOUR ROUTES
const tourRoutes = require("./routes/tourRoutes");
// ERROR HANDLING
const globalErrorHandler = require("./controller/errController");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({
    status: "success",
  });
});

app.use("/api/v1/tours", tourRoutes);

app.use(globalErrorHandler);

module.exports = app;
