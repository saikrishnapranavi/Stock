// // backend/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');
// const investmentRoutes = require('./routes/investmentRoutes');
// const otpRoutes = require('./routes/otpRoutes'); // Import the OTP routes

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors()); // Enable CORS

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Route definitions
// app.use('/api/users', userRoutes);
// app.use('/api/investments', investmentRoutes);
// app.use('/api/otp', otpRoutes); // Add OTP routes

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const otpRoutes = require('./routes/otpRoutes'); // Import the OTP routes
const forgotPasswordRoute = require('./routes/forgotPassword'); // Import forgot password route
const resetPasswordRoute = require('./routes/resetPassword'); // Import reset password route

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route definitions
app.use('/api/users', userRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/otp', otpRoutes); // Add OTP routes
app.use('/api/users', forgotPasswordRoute); // Add forgot password route
app.use('/api/users', resetPasswordRoute); // Add reset password route

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

