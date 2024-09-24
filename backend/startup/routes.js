const express = require('express');
const cors = require('cors');

const employee = require('../routes/employees');
const project = require('../routes/projects');
const deadline = require('../routes/deadlines');
const worklog = require('../routes/worklogs');
const task = require('../routes/tasks');
const sprint = require('../routes/sprints');



module.exports = function(app) {
  app.use(cors());
    app.use(express.json());
    app.use('/api/employee', employee);
    app.use('/api/project', project);
    app.use('/api/deadline', deadline);
    app.use('/api/worklog', worklog);
    app.use('/api/task', task);
    app.use('/api/sprint', sprint);
  }