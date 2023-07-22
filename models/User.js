const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            minlength: 6,
            maxlength: 255,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            minlength: 6,
            maxlength: 255,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            minlength: 6,
            maxlength: 255,
        },
        role: {
            type: String,
            default: 'user',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
