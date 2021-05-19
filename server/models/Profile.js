const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: Number,
    address: String,
    description: String,
    availability: [
        {
            start: Date,
            end: Date,
        }
    ],   
})

module.exports = Profile = mongoose.model('profile', profileSchema);