const express = require('express');
const router = express.Router();
const { auth, requireAdmin } = require('../middleware/auth');
const Membership = require('../models/Membership');
const User = require('../models/User');

// Add Membership
router.post('/add-membership', auth, requireAdmin, async (req, res) => {
  try {
    const { membershipNumber, vendorId, membershipType } = req.body;

    if (!membershipNumber || !vendorId || !membershipType) {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }

    const vendor = await User.findById(vendorId);
    if (!vendor || vendor.role !== 'vendor') {
      return res.status(400).json({ message: 'Invalid vendor' });
    }

    const existingMembership = await Membership.findOne({ membershipNumber });
    if (existingMembership) {
      return res.status(400).json({ message: 'Membership number already exists' });
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    
    if (membershipType === '6 months') {
      endDate.setMonth(endDate.getMonth() + 6);
    } else if (membershipType === '1 year') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else if (membershipType === '2 years') {
      endDate.setFullYear(endDate.getFullYear() + 2);
    }

    const membership = new Membership({
      membershipNumber,
      vendorId,
      membershipType,
      startDate,
      endDate,
      status: 'active'
    });

    await membership.save();
    res.status(201).json({ message: 'Membership added successfully', membership });
  } catch (error) {
    console.error('Add membership error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Membership by Number
router.get('/membership/:membershipNumber', auth, requireAdmin, async (req, res) => {
  try {
    const membership = await Membership.findOne({ 
      membershipNumber: req.params.membershipNumber 
    }).populate('vendorId', 'userId name email category');

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.json(membership);
  } catch (error) {
    console.error('Get membership error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Membership
router.put('/update-membership', auth, requireAdmin, async (req, res) => {
  try {
    const { membershipNumber, action, extensionType } = req.body;

    if (!membershipNumber) {
      return res.status(400).json({ message: 'Membership number is mandatory' });
    }

    const membership = await Membership.findOne({ membershipNumber });
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    if (action === 'cancel') {
      membership.status = 'cancelled';
      await membership.save();
      return res.json({ message: 'Membership cancelled successfully', membership });
    }

    if (action === 'extend') {
      const extensionMonths = extensionType === '6 months' ? 6 : 
                             extensionType === '1 year' ? 12 : 
                             extensionType === '2 years' ? 24 : 6;

      const newEndDate = new Date(membership.endDate);
      newEndDate.setMonth(newEndDate.getMonth() + extensionMonths);

      membership.endDate = newEndDate;
      membership.membershipType = extensionType;
      membership.status = 'active';
      await membership.save();

      return res.json({ message: 'Membership extended successfully', membership });
    }

    res.status(400).json({ message: 'Invalid action' });
  } catch (error) {
    console.error('Update membership error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all memberships
router.get('/memberships', auth, requireAdmin, async (req, res) => {
  try {
    const memberships = await Membership.find()
      .populate('vendorId', 'userId name email category')
      .sort({ createdAt: -1 });
    
    res.json(memberships);
  } catch (error) {
    console.error('Get memberships error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all vendors
router.get('/vendors', auth, requireAdmin, async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor' }).select('-password');
    res.json(vendors);
  } catch (error) {
    console.error('Get vendors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

