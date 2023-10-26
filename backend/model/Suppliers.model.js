const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Suppliers = Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    // class: {
    //     type: String,
    //     required: false
    // },
    products: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    },
    },
    phone: {
      type: String,
      required: true,
    },
    // outlets: {
    //   type: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "Outlet",
    //     },
    //   ],
    // },
    status: {
      type: String,
      required: true,
      enum: ["pending", "verified"],
      default: "pending",
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

mongoose.model("Suppliers", Suppliers);
