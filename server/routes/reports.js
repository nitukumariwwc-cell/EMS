const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Membership = require('../models/Membership');
const Order = require('../models/Order');
const User = require('../models/User');

// Get membership report
router.get('/memberships', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const memberships = await Membership.find()
      .populate('vendorId', 'userId name email category')
      .sort({ createdAt: -1 });
    
    res.json(memberships);
  } catch (error) {
    console.error('Get membership report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get transaction report
router.get('/transactions', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'user') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const orders = await Order.find()
      .populate('userId', 'userId name email')
      .populate('items.productId')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Get transaction report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

