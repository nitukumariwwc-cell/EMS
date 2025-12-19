const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Create order
router.post('/create', auth, async (req, res) => {
  try {
    const { name, email, address, city, state, pinCode, phone, paymentMethod } = req.body;

    if (!name || !email || !address || !city || !state || !pinCode || !phone || !paymentMethod) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      productName: item.productId.productName,
      quantity: item.quantity,
      price: item.price
    }));

    const order = new Order({
      orderNumber,
      userId: req.user._id,
      items: orderItems,
      totalAmount: cart.totalAmount,
      name,
      email,
      address,
      city,
      state,
      pinCode,
      phone,
      paymentMethod,
      status: 'Received'
    });

    await order.save();
    
    // Clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('items.productId')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get order by number
router.get('/:orderNumber', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
      .populate('items.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (for vendors/admins)
router.put('/:orderNumber/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Received', 'Ready for Shipping', 'Out For Delivery', 'Delivered'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

