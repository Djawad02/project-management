const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
id: {
    type: Number,
    required: true,
    unique: true
},
title: {
    type: String,
    required: true,
    trim: true
},
description: {
    type: String,
    required: true,
    trim: true
},
status: {
    type: String,
    required: true,
    enum: ['Not Started', 'In Progress', 'Completed'], 
    default: 'Not Started'
},
members: [{
    type: mongoose.Schema.Types.ObjectId,  // Refers to the Employee collection
    ref: 'Employee',
    required: true
}],
teamLead: {
    type: mongoose.Schema.Types.ObjectId,  // Refers to the Employee collection
    ref: 'Employee',
    required: true
},
source: {
    type: String,
    required: true,
    trim: true
}
});

const Project = mongoose.model('Project', projectSchema );

exports.Project = Project; 