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
            trim: true },
        description: String,
        category: String,
        image: String
    }, 
    { timestamps: true }
); //file info

module.exports = mongoose.model("Product", productSchema)