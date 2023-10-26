const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductCategory = Schema(
    {

        name: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: { createdAt: "created_at" },
    }
)

mongoose.model("ProductCategory", ProductCategory);