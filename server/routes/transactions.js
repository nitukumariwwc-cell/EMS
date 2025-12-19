const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Order = require('../models/Order');

// Get all transactions
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'user') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const orders = await Order.find()
      .populate('userId', 'userId name email')
      .populate('items.productId')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(orders);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

