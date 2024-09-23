const Sprint = require('../models/sprint'); 
const Project = require('../models/project');
const Task = require('../models/task');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
      const sprints = await Sprint.find()
                                  .populate('tasks', 'id title') 
                                  .populate('projectId', 'id title');

      res.json(sprints);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { projectId, tasks, ...sprintData } = req.body;

    const project = await Project.findOne({ id: projectId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const taskObjects = await Task.find({ id: { $in: tasks } });
    const taskIds = taskObjects.map(task => task._id); 

    const count = await Sprint.countDocuments();
    const newSprint = new Sprint({
      ...sprintData,
      id: count + 1,
      projectId: project._id,
      tasks: taskIds 
    });

    await newSprint.save();
    res.status(201).json(newSprint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { projectId, tasks, ...sprintData } = req.body;

    const sprint = await Sprint.findOne({ id: req.params.id });
    if (!sprint) {
      return res.status(404).json({ message: 'Sprint not found' });
    }

    if (projectId) {
      const project = await Project.findOne({ id: projectId });
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      sprint.projectId = project._id; 
    }
    if (tasks) {
      const taskObjects = await Task.find({ id: { $in: tasks } });
      sprint.tasks = taskObjects.map(task => task._id); 
    }

    Object.assign(sprint, sprintData);

    const updatedSprint = await sprint.save();
    res.json(updatedSprint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

  
router.delete('/:id', async (req, res) => {
  try {
    const sprint = await Sprint.findOneAndDelete({ id: req.params.id });
    if (!sprint) return res.status(404).json({ message: 'Sprint not found' });
    res.json({ message: 'Sprint deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const sprint = await Sprint.findOne({ id: req.params.id })
                                .populate('tasks','id title')
                                .populate('projectId', 'id title');
    if (!sprint) return res.status(404).json({ message: 'Sprint not found' });
    res.json(sprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  
module.exports = router; 