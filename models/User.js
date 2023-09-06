const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: { type: String, required: true },
        permission: { type: String, default: "No" }
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)