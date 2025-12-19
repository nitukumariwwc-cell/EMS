const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'event_management_secret_key_2024', {
    expiresIn: '24h'
  });
};

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if role matches (if role is specified)
    if (role && user.role !== role) {
      return res.status(403).json({ message: `Access denied. This login is for ${role}s only.` });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        userId: user.userId,
        role: user.role,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate random user ID
const generateRandomUserId = (role) => {
  let prefix;
  if (role === 'vendor') {
    prefix = 'VEND';
  } else if (role === 'user') {
    prefix = 'USER';
  } else {
    prefix = 'ADMIN';
  }
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  return `${prefix}${randomNum}`;
};

// Signup (for users, vendors, and admins)
router.post('/signup', async (req, res) => {
  try {
    const { password, name, email, category, address, city, state, pinCode, phone, role } = req.body;
    const userRole = role || 'vendor'; // Default to vendor if not specified

    // Trim and validate fields
    const trimmedName = (name || '').trim();
    const trimmedEmail = (email || '').trim();
    const trimmedPassword = (password || '').trim();
    const trimmedCategory = (category || '').trim();

    // Validate required fields with specific error messages
    if (!trimmedName) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (!trimmedEmail) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!trimmedPassword) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: trimmedEmail });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // For vendors, category is required
    if (userRole === 'vendor' && !trimmedCategory) {
      return res.status(400).json({ message: 'Category is required for vendors' });
    }

    // Generate a unique random userId
    let userId;
    let existingUser;
    do {
      userId = generateRandomUserId(userRole);
      existingUser = await User.findOne({ userId });
    } while (existingUser);

    const userData = {
      userId,
      password: trimmedPassword,
      name: trimmedName,
      email: trimmedEmail,
      role: userRole
    };

    // Add vendor-specific fields
    if (userRole === 'vendor') {
      userData.category = trimmedCategory;
      if (address && address.trim()) userData.address = address.trim();
      if (city && city.trim()) userData.city = city.trim();
      if (state && state.trim()) userData.state = state.trim();
      if (pinCode && pinCode.trim()) userData.pinCode = pinCode.trim();
      if (phone && phone.trim()) userData.phone = phone.trim();
    }

    const user = new User(userData);
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        userId: user.userId,
        role: user.role,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

