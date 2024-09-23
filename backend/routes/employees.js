const Employee = require('../models/employee'); 
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