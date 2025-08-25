const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    blindStickNumber: { type: String, required: true, unique: true }, // Each stick is unique and linked to one caregiver
});

module.exports = mongoose.model('User', userSchema);