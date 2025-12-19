const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Create default admin user
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const admin = new User({
        userId: 'admin',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        email: 'admin@example.com'
      });
      await admin.save();
      console.log('Default admin user created: admin@example.com/admin123');
    }

    // Create default user
    const userExists = await User.findOne({ email: 'user@example.com' });
    if (!userExists) {
      const user = new User({
        userId: 'user',
        password: 'user123',
        role: 'user',
        name: 'Test User',
        email: 'user@example.com'
      });
      await user.save();
      console.log('Default user created: user@example.com/user123');
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

