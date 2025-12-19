const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB\n');

    const users = await User.find({});
    console.log('Users in database:');
    console.log('==================');
    
    for (const user of users) {
      console.log(`\nUser ID: ${user.userId}`);
      console.log(`Email: ${user.email || 'NO EMAIL'}`);
      console.log(`Role: ${user.role}`);
      console.log(`Name: ${user.name || 'N/A'}`);
    }

    // Update users without emails
    const usersWithoutEmail = await User.find({ $or: [{ email: { $exists: false } }, { email: null }, { email: '' }] });
    
    if (usersWithoutEmail.length > 0) {
      console.log('\n\nUpdating users without emails...');
      
      for (const user of usersWithoutEmail) {
        let email = '';
        if (user.role === 'admin') {
          email = 'admin@example.com';
        } else if (user.role === 'user') {
          email = 'user@example.com';
        } else if (user.role === 'vendor') {
          email = `${user.userId}@vendor.com`;
        }
        
        if (email) {
          user.email = email;
          await user.save();
          console.log(`Updated ${user.userId} with email: ${email}`);
        }
      }
    }

    console.log('\n\nFinal user list:');
    console.log('================');
    const updatedUsers = await User.find({});
    for (const user of updatedUsers) {
      console.log(`${user.userId} | ${user.email} | ${user.role}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUsers();

