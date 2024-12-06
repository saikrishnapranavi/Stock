const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();


router.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Check if the token has expired
      });
      
      if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired.');
      }
      
      // Render a page where the user can enter a new password (or just return success)
      res.send('Token is valid. Show reset password form.');
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Hash the new password
    user.password = bcrypt.hashSync(newPassword, 10);
    user.resetPasswordToken = undefined; // Clear the token
    user.resetPasswordExpires = undefined; // Clear expiration
    await user.save();

    res.json({ success: true, message: 'Password has been reset.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error resetting password.' });
  }
});

module.exports = router;
