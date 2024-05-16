const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Teacher', 'Student', 'Admin'],
        required: true
    },
    department: {
        type: String
    },
    contactNumber: {
        type: String
    },
    accountStatus: {
        type: String,
        default: 'active'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
