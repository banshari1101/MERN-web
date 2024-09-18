const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async() => {
    try {
        await mongoose.connect(URI);
        console.log("DATABASE CONNECTED");
    } catch (error) {
        console.error("DATA BASE CONNECTION FAILED");
        process.exit(0);
    }
}

module.exports = connectDb;

