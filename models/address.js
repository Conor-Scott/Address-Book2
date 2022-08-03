const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('address', addressSchema)