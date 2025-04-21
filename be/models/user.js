const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    gender: { type: String, required: true }, 
    dob: { type: Date, required: true }, 
    password: { type: String, required: true }, 
    role: { type: String, required: true, default: "user" } 
});

module.exports = mongoose.model("User", UserSchema);