// backend/server.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows requests from your React app
app.use(express.json()); // Allows your server to parse incoming JSON data

// PostgreSQL Connection Pool Setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test Database Connection Endpoint
app.get("/api/health", async (req, res) => {
  try {
    const dbTest = await pool.query("SELECT NOW()");
    res.json({
      status: "Backend & Postgres are connected!",
      time: dbTest.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "Error", message: "Could not connect to Postgres" });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Node backend running on http://localhost:${PORT}`);
});

app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows); // Sends the array of users to the frontend
  } catch (err) {
    console.error("Database query error:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});
