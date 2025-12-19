const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Order = require('../models/Order');
const Guest = require('../models/Guest');

// Get user dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    const orders = await Order.countDocuments({ userId: req.user._id });
    const guests = await Guest.countDocuments({ userId: req.user._id });
    
    res.json({
      orders,
      guests
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

