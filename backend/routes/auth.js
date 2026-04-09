const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
};

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(`Registration attempt for: ${email}`);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log(`Registration failed: User ${email} already exists`);
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role });
    if (user) {
      res.status(201).json({
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(`Registration Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt for: ${email}`);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Login failed: User ${email} not found`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    console.log(`Comparing password for ${email}...`);
    const isMatch = await user.matchPassword(password);
    console.log(`Password match result for ${email}: ${isMatch}`);
    
    if (isMatch) {
      console.log(`Login successful: ${email}`);
      res.json({
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
