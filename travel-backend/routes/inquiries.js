
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Submit a booking inquiry
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      tour_id,
      travel_date,
      travelers,
      message
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !tour_id ||
      !travel_date ||
      !travelers
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required booking details."
      });
    }

    const sql = `
      INSERT INTO booking_inquiries
      (name, email, phone, tour_id, travel_date, travelers, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      email,
      phone,
      Number(tour_id),
      travel_date,
      Number(travelers),
      message || null
    ];

    const [result] = await pool.execute(sql, values);

    res.status(201).json({
      success: true,
      message: "Booking inquiry saved successfully!",
      inquiryId: result.insertId
    });
  } catch (error) {
    console.error("Error saving inquiry:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to save booking inquiry."
    });
  }
});

// Get all booking inquiries
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM booking_inquiries
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch booking inquiries."
    });
  }
});

module.exports = router;
