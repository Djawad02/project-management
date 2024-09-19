const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
id: {
    type: Number,
    required: true,
    unique: true
},
projectId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project',
    required: true
},
sprintTitle: {
    type: String,
    required: true,
    trim: true
},
startDate: {
    type: Date,
    required: true
},
endDate: {
    type: Date,
    required: true
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
tasks: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task'
}]
});

const Sprint = mongoose.model('Sprint', sprintSchema);

module.exports = Sprint;
