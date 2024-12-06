
// // backend/models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },   // New field
//   lastName: { type: String, required: true },    // New field
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   balance: { type: Number, default: 1000 }, // Initial balance
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 1000 }, // Initial balance

  // Adding reset password functionality
  resetPasswordToken: { type: String }, // Token for resetting password
  resetPasswordExpires: { type: Date }, // Expiration date for reset token
});

// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);
