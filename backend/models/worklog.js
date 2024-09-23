const mongoose = require('mongoose');

const workLogSchema = new mongoose.Schema({
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
employeeId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Employee', 
    required: true 
},
date: {
    type: Date,
    required: true
},
hoursWorked: {
    type: Number,
    required: true,
    min: 0 
},
description: {
    type: String,
    required: true,
    trim: true
}
});

const WorkLog = mongoose.model('WorkLog', workLogSchema);

module.exports = WorkLog;
