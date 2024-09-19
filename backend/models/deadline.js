const mongoose = require('mongoose');

const deadlineSchema = new mongoose.Schema({
id: {
    type: Number,
    required: true,
    unique: true
},
projectId: {
    type: mongoose.Schema.Types.ObjectId,  // Refers to the Project collection
    ref: 'Project',
    required: true
},
deadlineDate: {
    type: Date,
    required: true
},
description: {
    type: String,
    required: true,
    trim: true
}
});

const Deadline = mongoose.model('Deadline',deadlineSchema);
exports.Deadline = Deadline;