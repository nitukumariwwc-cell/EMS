const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: String,
  phone: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Guest', guestSchema);

