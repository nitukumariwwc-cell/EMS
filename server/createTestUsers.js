const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const createTestUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB\n');

    // Update or create admin
    let admin = await User.findOne({ userId: 'admin' });
    if (admin) {
      admin.email = 'admin@example.com';
      admin.password = 'admin123';
      await admin.save();
      console.log('✅ Admin updated: admin@example.com / admin123');
    } else {
      admin = new User({
        userId: 'admin',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        email: 'admin@example.com'
      });
      await admin.save();
      console.log('✅ Admin created: admin@example.com / admin123');
    }

    // Update or create user
    let user = await User.findOne({ userId: 'user' });
    if (user) {
      user.email = 'user@example.com';
      user.password = 'user123';
      await user.save();
      console.log('✅ User updated: user@example.com / user123');
    } else {
      user = new User({
        userId: 'user',
        password: 'user123',
        role: 'user',
        name: 'Test User',
        email: 'user@example.com'
      });
      await user.save();
      console.log('✅ User created: user@example.com / user123');
    }

    // Create test vendor
    let vendor = await User.findOne({ userId: 'vendor' });
    if (vendor) {
      vendor.email = 'vendor@example.com';
      vendor.password = 'vendor123';
      vendor.category = 'Catering';
      await vendor.save();
      console.log('✅ Vendor updated: vendor@example.com / vendor123');
    } else {
      vendor = new User({
        userId: 'vendor',
        password: 'vendor123',
        role: 'vendor',
        name: 'Test Vendor',
        email: 'vendor@example.com',
        category: 'Catering'
      });
      await vendor.save();
      console.log('✅ Vendor created: vendor@example.com / vendor123');
    }

    console.log('\n📋 Login Credentials:');
    console.log('===================');
    console.log('Admin:  admin@example.com / admin123');
    console.log('User:   user@example.com / user123');
    console.log('Vendor: vendor@example.com / vendor123');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createTestUsers();

