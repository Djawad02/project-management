const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
resources: {
    frontend: {
      type: Number,
      required: true,
      min: 0 
    },
    backend: {
      type: Number,
      required: true,
      min: 0
    },
    qa: {
      type: Number,
      required: true,
      min: 0
    }
},
status: {
    type: String,
    required: true,
    enum: ['Not Started', 'In Progress', 'Completed'], 
    default: 'Not Started'
},
description: {
    type: String,
    required: true,
    trim: true
}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
