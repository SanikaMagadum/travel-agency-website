
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const toursRouter = require("./routes/tours");
const inquiriesRouter = require("./routes/inquiries");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Tours and Travel API!"
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Travel Agency API is running"
  });
});
app.use("/api/tours", toursRouter);
app.use("/api/inquiries", inquiriesRouter);
// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Travel API running at http://localhost:${PORT}`);
});
