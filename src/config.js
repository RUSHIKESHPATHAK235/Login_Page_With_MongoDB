const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Reg-Page");


connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
// collection part
const collection = new mongoose.model("users", loginSchema);

module.exports = collection;