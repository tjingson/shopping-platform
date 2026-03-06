const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            trim: true 
        },
        price: { 
            type: Number, 
            required: true, 
            trim: true },
        stock: { 
            type: Number, 
            required: true, 
            default: 0,
            trim: true },
        description: {
            type: String,
            default: ""
        },
        category: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, 
    { timestamps: true }
); //file info

module.exports = mongoose.model("Product", productSchema)