const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
id: {
    type: Number,
    required: true,
    unique: true
},
name: {
    type: String,
    required: true,
    trim: true
},
designation: {
    type: String,
    required: true,
    trim: true
},
contact: {
    type: String,
    required: true,
    unique: true,
    trim: true
}
});

const Employee = mongoose.model('Employee', employeeSchema );

exports.Employee = Employee; 