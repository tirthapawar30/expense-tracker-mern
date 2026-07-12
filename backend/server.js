const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware (MUST come before routes)
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});