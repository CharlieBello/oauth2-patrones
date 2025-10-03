const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    secret: { type: String, required: true },
    redirectUris: [{ type: String }]
});

module.exports = mongoose.model('Client', ClientSchema);