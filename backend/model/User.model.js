const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "verified"],
            default: "pending"
        },
        telephone: {
            type: String,
            required: false
        },
    },
    {
        timestamps: { createdAt: "created_at" },
    }
)

mongoose.model("User", User);