const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = Schema(
    {
        category: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "ProductCategory"
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        unit: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "ProductUnit"
        },
    },
    {
        timestamps: { createdAt: "created_at" },
    }
)

mongoose.model("Product", Product);