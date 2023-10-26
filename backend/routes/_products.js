const express = require('express');
const router = express.Router();
const auth = require('../helper/auth');
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ProductCategory = mongoose.model("ProductCategory");
const ProductUnit = mongoose.model("ProductUnit");

// add new
router.post('/create', auth, async (req, res) => {
    try {
        if (req.user?.role !== "admin" && req.user?.role !== "outletManager") {
            return res.status(403).json({ success: false, message: "Authorization failed" })
        }
        const newProduct = new Product(req.body);
        newProduct.save((err, doc) => {
            if (err) return res.send(500, { error: err });
            return res.json({ success: true, message: "Product created successfully" });
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});

// get single item 
router.get('/details/:id', auth, async (req, res) => {
    try {
        const product = await Outlet.findOne({ _id: req.params.id })
        res.json({ success: true, product: product })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});
// get all list

router.get('/list-all', auth, async (req, res) => {
    try {

        // const products = await Product.find({}, ["name", "price", "unit"]).sort({ name: 1 });
        const products = await Product.aggregate([
            {
                $project: {
                    name: 1,
                    price: 1,
                    unit: 1
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
        return res.status(200).json({
            success: true,
            products: products
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});


// get all list
router.get('/list', auth, async (req, res) => {
    try {
        const page = req.query.page || 1;
        let queryParams = req.query || {};
        queryParams && delete queryParams["page"];
        const PAGE_SIZE = req.query.size || 5;
        const skip = (page - 1) * PAGE_SIZE;

        let tempQuery = {};
        let tempData = {};
        if (queryParams && queryParams["search"]) {
            const search = {
                $regex: ".*" + queryParams["search"] + ".*",
                $options: "i"
            };
            tempData = { name: search };
        }

        if (queryParams.category) {
            tempQuery = { category: queryParams.category }
        }

        if (queryParams.unit) {
            tempQuery = { unit: queryParams.unit }
        }


        const total = await Product.countDocuments({ ...tempQuery, ...tempData })
        const products = await Product.aggregate([
            {
                $match: { ...tempQuery, ...tempData }
            },
            {
                $lookup: {
                    from: "productcategories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $lookup: {
                    from: "productunits",
                    localField: "unit",
                    foreignField: "_id",
                    as: "unit",
                },
            },
            {
                $unwind: {
                    path: "$category",
                    preserveNullAndEmptyArrays: true, // Preserve empty or non-existent categories
                },
            },
            {
                $unwind: {
                    path: "$unit",
                    preserveNullAndEmptyArrays: true, // Preserve empty or non-existent units
                },
            },
            {
                $addFields: {
                    nameLower: { $toLower: "$name" }, // Convert name to lowercase
                },
            },
            {
                $sort: { nameLower: 1 }, // Sort by lowercase name
            },
            ...(
                PAGE_SIZE === "all" ?
                    [] :
                    [{
                        $skip: skip,
                    },
                    {
                        $limit: Number(PAGE_SIZE),
                    }]
            )
        ]);

        return res.status(200).json({
            success: true,
            data: { total, products }
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});

// edit 
router.patch('/edit/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        await Product.updateOne({ _id: id }, req.body, { upsert: true })
        res.json({ success: true, message: "Product Updated Successfully" })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});

// Delete 
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.params.id })
        res.json({ success: true, message: "Product has been Deleted Successfully" })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});


// Category

// add new
router.post('/category/create', auth, async (req, res) => {
    try {
        // if (req.user?.role !== "admin") {
        //     return res.status(403).json({ success: false, message: "Authorization failed" })
        // }
        const newProductCategory = new ProductCategory({ name: req.body?.name, slug: req.body?.name });
        newProductCategory.save((err, doc) => {
            if (err) return res.send(500, { error: err });
            return res.json({ success: true, message: "Category created successfully" });
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});

// get all
router.get('/category/list', auth, async (req, res) => {
    try {
        // const allCategory = await ProductCategory.find({}, ["name"]).sort({ created_at: -1 });
        const allCategory = await ProductCategory.aggregate([
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
        return res.json({ success: true, categories: allCategory })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});

// Unit

// add new
router.post('/unit/create', auth, async (req, res) => {
    try {
        // if (req.user?.role !== "admin") {
        //     return res.status(403).json({ success: false, message: "Authorization failed" })
        // }
        const newProductUnit = new ProductUnit({ name: req.body?.name, slug: req.body?.name });
        newProductUnit.save((err, doc) => {
            if (err) return res.send(500, { error: err });
            return res.json({ success: true, message: "Unit created successfully" });
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});

// get all
router.get('/unit/list', auth, async (req, res) => {
    try {
        // const allUnit = await ProductUnit.find({}, ["name"]).sort({ created_at: -1 });
        const allUnit = await ProductUnit.aggregate([
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
        return res.json({ success: true, units: allUnit })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});

module.exports = router

