const express = require('express');
const router = express.Router();
const { auth, requireAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Membership = require('../models/Membership');

// Get admin dashboard stats
router.get('/dashboard', auth, requireAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalVendors = await User.countDocuments({ role: 'vendor' });
    const totalMemberships = await Membership.countDocuments();

    res.json({
      totalUsers,
      totalVendors,
      totalMemberships
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

