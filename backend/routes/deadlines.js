const Deadline = require('../models/deadline'); 
const Project = require('../models/project');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const deadline = await Deadline.find()
      .sort('deadlineDate')
      .populate('projectId', 'id title');
      res.json(deadline);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post('/', async (req, res) => {
  try {
      const { projectId, ...deadlineData } = req.body;
      const project = await Project.findOne({ id: projectId });
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      const count = await Deadline.countDocuments();
      const newDeadline = new Deadline({
          ...deadlineData,
          id:count+1,
          projectId: project._id 
      });
      await newDeadline.save();
      res.status(201).json(newDeadline);

  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { projectId, ...updateData } = req.body;
    if (projectId) {
      const project = await Project.findOne({ id: projectId });
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      updateData.projectId = project._id;  // Use the ObjectId from the Project
    }
    const deadline = await Deadline.findOneAndUpdate(
      { id: req.params.id }, 
      updateData, 
      { new: true }
    );

    if (!deadline) {
      return res.status(404).json({ message: 'Deadline not found' });
    }

    res.json(deadline);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

  
router.delete('/:id', async (req, res) => {
  try {
    const deadline = await Deadline.findOneAndDelete({ id: req.params.id });
    if (!deadline) return res.status(404).json({ message: 'Deadline not found' });
    res.json({ message: 'Deadline deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const deadline = await Deadline.findOne({ id: req.params.id })
                                    .populate('projectId','id title');
    if (!deadline) return res.status(404).json({ message: 'Deadline not found' });
    res.json(deadline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 