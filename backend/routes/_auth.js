const express = require('express');
const { reHashing } = require('../helper/hashing');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../helper/auth');
const mongoose = require("mongoose");
const User = mongoose.model("User");
// Trigger User Login
router.get('/', auth, async (req, res) => {
    const user = req.user
    if (user) {
        return res.status(200).json({
            user: {
                _id: user._id,
                role: user.role,
                email: user.email,
                firstName: user.firstName || "",
                lastName: user.lastName || ""
            }
        });
    }
    return res.status(400).send("Authentication Failed")
});

router.post('/register', async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body
        if (!email && !password) return res.status(400).send("Missing Values")
        const existingUser = await User.findOne({ email });
        if (existingUser?.email) {
            return res.status(400).json({ success: false, message: "Email Already Registered!" })
        }
        const hashedPassword = reHashing(password)
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
            role: "user"
        })
        await newUser.save();
        return jwt.sign(
            {
                firstName,
                lastName,
                email,
            },
            process.env.JWT_SECRET,
            { expiresIn: 7200 },
            async (_err, token) => {
                if (_err) throw _err;
                res.status(200).json({
                    success: true,
                    message: "Account Created Successfully",
                    token,

                });
            }
        );

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })

    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email && !password) return res.status(400).send("Missing Values")
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not Found!" })
        }
        if (user.status === "pending") {
            return res.status(403).json({ success: false, message: "Please verify your account" })
        }
        const hashedPassword = reHashing(password)
        if (user?.password === hashedPassword) {
            return jwt.sign(
                {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                },
                process.env.JWT_SECRET,
                { expiresIn: 604800 },
                async (_err, token) => {
                    if (_err) throw _err;
                    res.status(200).json({
                        success: true,
                        token,
                        user: {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName
                        },
                    });
                }
            );
        }
        return res.status(400).send({ success: false, message: "Email and Password doesn't match!" })
    } catch (error) {
        return res.status(400).send({ success: false, message: error.message })
    }
});



router.post('/verify', async (req, res) => {
    const { token } = req.body;
    // Check for token
    if (!token) {
        return res.status(401).json({
            message: 'No token, authorization denied',
        });
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.email) {
            const user = await User.findOne({ email: decoded?.email });
            if (user.email) {
                await User.updateOne({ email: user.email }, { status: "verified" }, { upsert: true })
                res.json({ message: 'Verification Successful!' });
            } else {
                res.status(400).json({
                    message: 'Verification Failed',
                });
            }
        } else {
            res.status(400).json({
                message: 'Email missing',
            });
        }

    } catch (e) {
        res.status(400).json({
            message: 'Token is not Valid',
        });
    }
});

module.exports = router