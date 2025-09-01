const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    
    const payload = { id: user._id, email: user.email, role: user.role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

const authMiddleware = require("../middleware/authMiddleware");

// Protected route: Get current user
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Token valid, user fetched successfully",
    user: req.user
  });
});

module.exports = router;
