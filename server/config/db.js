const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        } catch (error) {
            console.error('DB connection failed:', error.message);
            process.exit(1); // Stop app
        }
};

module.exports = connectDB;