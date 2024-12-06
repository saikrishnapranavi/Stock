const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const { sendEmail } = require('../utils/sendEmail'); // A utility function to send emails
const router = express.Router();

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist.' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    await sendEmail(user.email, 'Password Reset', `Click the link to reset your password: ${resetLink}`);

    res.json({ success: true, message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing the request.' });
  }
});

module.exports = router;





// const express = require('express');
// const User = require('../models/User');  // Import the User model
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const router = express.Router();

// // Nodemailer setup (this is a basic example, you may need to adjust for your email provider)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // your email
//     pass: process.env.EMAIL_PASS, // your email password or app-specific password
//   },
// });

// router.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).send('No user found with that email address.');
//     }

//     // Create a reset token
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
//     await user.save();

//     // Generate the reset password URL
//     const resetPasswordUrl = `https://yourdomain.com/reset-password/${resetToken}`;

//     // Send the reset password email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Password Reset Request',
//       text: `Click the link to reset your password: ${resetPasswordUrl}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).send('Error sending email.');
//       }
//       res.status(200).send('Reset link sent to email.');
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;
