const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Product = require('../models/Product');

// Get all products (for users)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { status: 'active' };
    if (category) {
      query.category = category;
    }
    
    const products = await Product.find(query)
      .populate('vendorId', 'userId name email category')
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products by vendor
router.get('/vendor/:vendorId', async (req, res) => {
  try {
    const products = await Product.find({ 
      vendorId: req.params.vendorId,
      status: 'active' 
    }).populate('vendorId', 'userId name email category');
    
    res.json(products);
  } catch (error) {
    console.error('Get vendor products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

