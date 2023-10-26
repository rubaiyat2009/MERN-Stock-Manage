const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductUnit = Schema(
    {

        name: {
            type: String,
            required: false,
            unique: true
        },
    },
    {
        timestamps: { createdAt: "created_at" },
    }
)

mongoose.model("ProductUnit", ProductUnit);