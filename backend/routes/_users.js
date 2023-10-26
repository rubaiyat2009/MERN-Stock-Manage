const express = require('express');
const router = express.Router();
const auth = require('../helper/auth');
const mongoose = require("mongoose");
const { reHashing } = require('../helper/hashing');
const User = mongoose.model("User");
const path = require('path');
const fs = require('fs');
const Mustache = require('mustache');
const jwt = require('jsonwebtoken');
const sendMail = require('../helper/sendMail');

// add new user
router.post('/create', auth, async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ success: false, message: "Authorization failed" })
        }
        const existingUser = await User.findOne({ email: req.body?.email });
        if (existingUser?.email) {
            return res.status(400).json({ success: false, message: "Email Already Registered!" })
        }
        const hashedPassword = reHashing(req.body?.password)
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        })

        await newUser.save();

        // send email for confirmation

        const validity = 3600;

        jwt.sign(
            {
                email: req.body?.email,
                firstName: req.body?.firstName
            },
            process.env.JWT_SECRET,
            { expiresIn: validity },
            async (_err, token) => {
                if (_err) throw _err;
                const filePath = path.resolve(
                    'template',
                    'accountConfirmation.html'
                );
                const htmlFile = fs.readFileSync(filePath);
                const html = Mustache.render(htmlFile.toString(), {
                    url: `${process.env.BASE_URL}verify-account/${token}`,
                    validity: validity / (60 * 60),
                });
                await sendMail({ to: req.body?.email, subject: "Verify Account", html })
                console.log(`${process.env.BASE_URL}verify-account/${token}`);

            })

        res.json({ success: true, message: "Verification Email Sent to You" })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});


// get all user list
router.get('/list', auth, async (req, res) => {
    try {
        if (req.user?.role !== "admin" && req.user?.role !== "readonlyAdmin") {
            return res.status(403).json({ success: false, message: "Authorization failed" })
        }
        const page = req.query.page || 1;
        let queryParams = req.query || {};
        queryParams && delete queryParams["page"];
        const PAGE_SIZE = req.query.size || 5;
        const skip = (page - 1) * PAGE_SIZE;
        const sort = (req.query.sort === "asc" ? 1 : -1) || -1;
        let tempData = {};
        let tempQuery = {};

        if (queryParams && queryParams["search"]) {
            const search = {
                $regex: ".*" + queryParams["search"] + ".*",
                $options: 'i'
            };
            tempData = {
                $or: [{ name: search }, { email: search }],
            };
            queryParams["search"];
        }
        if (queryParams.role) {
            tempQuery = { role: queryParams.role }
        }
        const total = await User.countDocuments({ ...queryParams, ...tempData, ...tempQuery })
        const users = await User.find({ ...queryParams, ...tempData, ...tempQuery }, ["firstName", "lastName", "email", "role", "created_at", "status"]).skip(skip).limit(PAGE_SIZE).sort({ firstName: sort });

        return res.status(200).json({
            success: true,
            data: { total, users }
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});


// all user list 
router.get('/list-all', auth, async (req, res) => {
    try {
        const allUsers = await User.find({ status: "verified" }, ["email"]).sort({ created_at: -1 });
        return res.status(200).json({
            success: true,
            allUsers
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
})

// edit user
router.get('/details/:id', auth, async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ success: false, message: "Authorization failed!" })
        }
        const { id } = req.params;
        
        const userDetails = await User.findOne({ _id: id }, ["email", "firstName", "lastName", "role", "status", "telephone"])
        res.json({ success: true, userDetails: userDetails })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});


// edit user
router.patch('/edit/:id', auth, async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ success: false, message: "Authorization failed" })
        }
        const { id } = req.params;
        const payload = { ...req.body };
        if (req.body?.password) {
            payload.password = reHashing(req.body?.password)
        }
        await User.updateOne({ _id: id }, payload, { upsert: true })
        res.json({ success: true, message: "User Updated Successfully" })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});

// Delete User
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ success: false, message: "Authorization failed" })
        }
        await User.deleteOne({ _id: req.params.id })
        res.json({ success: true, message: "User Deleted Successfully" })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});
module.exports = router