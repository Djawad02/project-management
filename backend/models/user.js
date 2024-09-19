const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
id: {
    type: Number,
    required: true,
    unique: true
},
username: {
    type: String,
    required: true,
    trim: true,
    unique: true
},
password: {
    type: String,
    required: true,
    minlength: 5 
},
role: {
    type: String,
    required: true,
    enum: ['Admin', 'Team Lead', 'Employee'], // Valid roles
    default: 'Employee'
}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
