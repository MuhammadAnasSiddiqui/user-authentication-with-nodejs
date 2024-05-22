const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rep_password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;