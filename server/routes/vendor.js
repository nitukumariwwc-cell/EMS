const express = require('express');
const router = express.Router();
const { auth, requireVendor } = require('../middleware/auth');
const Product = require('../models/Product');

// Get vendor products
router.get('/products', auth, requireVendor, async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add product
router.post('/products', auth, requireVendor, async (req, res) => {
  try {
    const { productName, productPrice, productImage } = req.body;

    if (!productName || !productPrice) {
      return res.status(400).json({ message: 'Product name and price are required' });
    }

    const product = new Product({
      productName,
      productPrice,
      productImage: productImage || '',
      vendorId: req.user._id,
      category: req.user.category
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/products/:id', auth, requireVendor, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, vendorId: req.user._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.assign(product, req.body);
    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/products/:id', auth, requireVendor, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, vendorId: req.user._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

