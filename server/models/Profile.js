const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    isDogSitter: {
        type: Boolean,
        required: true,
        default: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: String,
    phoneNumber: Number,
    address: String,
    city: String,
    description: String,
    availability: [
        {
            start: Date,
            end: Date,
        }
    ],
    price: Number,
    profilePhoto: String,
    coverPhoto: String,
    gallery: [String],
})

module.exports = Profile = mongoose.model('profile', profileSchema);