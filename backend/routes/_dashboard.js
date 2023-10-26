const express = require('express');
const router = express.Router();
const auth = require('../helper/auth');
const mongoose = require("mongoose");
const upload = require('../helper/multer');
const moment = require('moment');

const User = mongoose.model("User");



// current user outlet
// router.get('/outlets', auth, async (req, res) => {
//     const user = await User.findById(req.user?._id)
//     const isAdmin = user?.role === "admin"
//     try {
//         const query = isAdmin ? {} : { users: { $in: [req.user?._id] } }
//         const outlets = await Outlet.find(query)
//         return res.status(200).json({
//             success: true,
//             outlets
//         });

//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message })
//     }
// })



module.exports = router




