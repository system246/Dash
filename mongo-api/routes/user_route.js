const express = require('express');
const User = require('../module/user'); // Ensure this path is correct

const router = express.Router();

// Get all users
router.get('/get-user', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new user
router.post('/sign-up', async (req, res) => {
    const { email, Password } = req.body; // Keep 'Password' capitalized

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "This email is already registered." });
        }

        // Create and save user
        const newUser = new User({ email, Password }); // Keep 'Password' capitalized
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully!", user: savedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/sign-in', async (req, res) => {
    console.log("Received Data:", req.body); // Debugging

    const { email, Password } = req.body;

    // Check if email and password are provided
    if (!email || !Password) {
        return res.status(400).json({ message: "Email and password are required!" });
    }

    try {
        const user = await User.findOne({ email, Password });

        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up first." });
        }

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
