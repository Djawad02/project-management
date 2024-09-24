const Employee = require('../models/employee'); 
const Project = require('../models/project');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const employees = await Employee.find().sort('name');
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// router.get('/project/:title', async (req, res) => {
//   const { title } = req.params;

//   try {
//     const project = await Project.findOne({ title }).populate('members');
//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' });
//     }
//     const employees = project.members;    
//     res.json(employees);
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     res.status(500).json({ message: "Error fetching employees." });
//   }
// });

router.post('/', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const newEmployee = new Employee({
      ...req.body,
      id: count + 1
    });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
  
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ id: req.params.id });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ id: req.params.id });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


  
module.exports = router; 