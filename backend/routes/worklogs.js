const WorkLog = require('../models/worklog');
const Project = require('../models/project');
const Employee = require('../models/employee');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const worklog = await WorkLog.find()
      .sort('-hours')
      .populate('projectId', 'id title');
      res.json(worklog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { projectId, employeeId, ...worklogData } = req.body;
      const project = await Project.findOne({ id: projectId });
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      const employee = await Employee.findOne({ id: employeeId });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      const count = await WorkLog.countDocuments();
      const newWorklog = new WorkLog({
        ...worklogData,
        id: count + 1,
        projectId: project._id,  
        employeeId: employee._id 
      });
  
      await newWorklog.save();
      res.status(201).json(newWorklog);
  
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

router.put('/:id', async (req, res) => {
  try {
    const { projectId, employeeId, ...worklogData } = req.body;

    const project = await Project.findOne({ id: projectId });
      if (!project) {
          return res.status(404).json({ message: 'Project not found' });
      }

      const employee = await Employee.findOne({id:employeeId});
      if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
      }
    if (projectId) {
      worklogData.projectId = project._id
    }
    if (employeeId) {
      worklogData.employeeId = employee._id 
    }

    const worklog = await WorkLog.findOneAndUpdate(
      { id: req.params.id },
      worklogData,
      { new: true }
    );

    if (!worklog) return res.status(404).json({ message: 'Worklog not found' });
    res.json(worklog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

  
router.delete('/:id', async (req, res) => {
  try {
    const worklog = await WorkLog.findOneAndDelete({ id: req.params.id });
    if (!worklog) return res.status(404).json({ message: 'worklog not found' });
    res.json({ message: 'worklog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const worklog = await WorkLog.findOne({ id: req.params.id })
                                    .populate('projectId','id title');
    if (!worklog) return res.status(404).json({ message: 'worklog not found' });
    res.json(worklog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 