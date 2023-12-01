const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Your name is required'],
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, 'Your email is required'],
        minlength: 3,
        maxlength: 200,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Your email is required'],
        minlength: 3,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('SocketAppUsers', userSchema);