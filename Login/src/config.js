const mongoose = require('mongoose');
// const connect = mongoose.connect("mongodb://localhost:27017/Space");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/Space");


// Checking database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
// .catch(() => {
//     console.log("Database cannot be Connected");
// })

.catch((err) => {
    console.error("Database connection error:", err.message);
});

// Creating Schema
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;