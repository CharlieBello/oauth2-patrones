const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    clientId: { type: String, required: true },
    userId: { type: String, required: true },
    revoked: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);