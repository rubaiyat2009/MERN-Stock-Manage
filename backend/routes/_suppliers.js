const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const mongoose = require("mongoose");
const Suppliers = mongoose.model("Suppliers");

// add new
router.post("/create", auth, async (req, res) => {
  try {
    if (req.user?.role !== "admin" && req.user?.role !== "outletManager") {
      return res
        .status(403)
        .json({ success: false, message: "Authorization failed" });
    }
    const newSuppliers = new Suppliers(req.body);
    newSuppliers.save((err, doc) => {
      if (err) return res.send(500, { error: err });
      return res.json({
        success: true,
        message: "Suppliers created successfully",
      });
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// get all list
router.get("/list-all", auth, async (req, res) => {
  try {
    // const suppliers = await Suppliers.find({}, ["name"]);
    const suppliers = await Suppliers.aggregate([
      {
        $project: {
          name: 1
        }
      },
      {
        $addFields: {
          nameLower: { $toLower: "$name" }, // Convert name to lowercase
        },
      },
      {
        $sort: { nameLower: 1 }, // Sort by lowercase name
      }
    ]);
    res.json({ success: true, suppliers: suppliers });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// get  list
router.get("/list", auth, async (req, res) => {
  try {
    const page = req.query.page || 1;
    let queryParams = req.query || {};
    queryParams && delete queryParams["page"];
    const PAGE_SIZE = req.query.size || 5;
    const skip = (page - 1) * PAGE_SIZE;

    let tempQuery = {};

    if (queryParams.category) {
      tempQuery = { category: queryParams.category };
    }

    // if (
    //   req.user.role === "outletManager" ||
    //   req.user.role === "readonlyOutletManager"
    // ) {
    //   const outlet = await Outlet.find({ user: req.user._id });
    //   if (outlet.length > 0) {
    //     tempQuery.outlets = { $in: [outlet[0]._id] };
    //   } else {
    //     return res.status(200).json({
    //       success: true,
    //       data: { total: 0, suppliers: [] },
    //     });
    //   }
    // }

    const total = await Suppliers.countDocuments({
      ...tempQuery,
    });
    // const suppliers = await Suppliers.find({ ...tempQuery })
    //   .skip(skip)
    //   .limit(PAGE_SIZE)
    //   .sort({ created_at: -1 });
    const suppliers = await Suppliers.aggregate([
      {
        $match: { ...tempQuery }
      },
      {
        $addFields: {
          nameLower: { $toLower: "$name" }, // Convert name to lowercase
        },
      },
      {
        $sort: { nameLower: 1 }, // Sort by lowercase name
      },
      {
        $skip: skip,
      },
      {
        $limit: Number(PAGE_SIZE),
      }
    ]);

    return res.status(200).json({
      success: true,
      data: { total, suppliers },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// edit
router.get("/details/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Suppliers.findOne({ _id: id })
      .populate("products", ["name", "price"])
      // .populate("outlets", "name");
    res.json({ success: true, supplier });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// edit
router.patch("/edit/:id", auth, async (req, res) => {
  try {
    // if (req.user?.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: "Authorization failed" });
    // }
    const { id } = req.params;
    await Suppliers.updateOne({ _id: id }, req.body, { upsert: true });
    res.json({ success: true, message: "Suppliers Updated Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    await Suppliers.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: "Suppliers Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
module.exports = router;
