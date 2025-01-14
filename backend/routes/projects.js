const mongoose = require('mongoose');
const express = require('express');


const Project = require('../models/project'); 
const Employee = require('../models/employee');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const projects = await Project.find()
        .sort('title')
        .populate('members', 'id name')
        .populate('teamLead', 'id name');
  
      res.json(projects);  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post('/', async (req, res) => {
    try {
      const { members, teamLead, ...projectData } = req.body;
  
      const memberIds = await Employee.find({ id: { $in: members } }).select('_id');
  
      const teamLeadEmployee = await Employee.findOne({ id: teamLead }).select('_id');
  
      if (!teamLeadEmployee) {
        return res.status(400).json({ message: 'Invalid team lead ID' });
      }
      const count = await Project.countDocuments();
      const newProject = new Project({
        ...projectData,
        id: count + 1,
        members: memberIds.map((emp) => emp._id), 
        teamLead: teamLeadEmployee._id,            
      });
  
      await newProject.save();
      res.status(201).json(newProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

router.put('/:id', async (req, res) => {
  try {
    const { members, teamLead, ...projectData } = req.body;
    
    let memberDocs = [];
    if (members && members.length > 0) {
      memberDocs = await Employee.find({ id: { $in: members } }).select('_id');
    }
    let teamLeadEmployee = null;
    if (teamLead !== undefined) {
      teamLeadEmployee = await Employee.findOne({ id: teamLead }).select('_id');
      if (!teamLeadEmployee) {
        return res.status(400).json({ message: 'Invalid team lead ID' });
      }
    }

    const updatedProjectData = {
      ...projectData,
      ...(memberDocs.length > 0 && { members: memberDocs.map(emp => emp._id) }), 
      ...(teamLeadEmployee && { teamLead: teamLeadEmployee._id }),  
    };

    const project = await Project.findOneAndUpdate({ id: req.params.id }, updatedProjectData, { new: true });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ id: req.params.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  
// router.get('/:id', async (req, res) => {
//   try {
//     const project = await Project.findOne({ id: req.params.id })
//       .populate('members', 'id name') 
//       .populate('teamLead', 'id name'); 

//     if (!project) return res.status(404).json({ message: 'Project not found' });
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.get('/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const project = await Project.findOne({ title }).populate('members');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const employees = project.members;    
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees." });
  }
});


router.put('/:projectId/add-member', async (req, res) => {
  const { projectId } = req.params; // Numeric projectId
  const { memberId } = req.body; // Numeric memberId
  const project = await Project.findOne({ id: req.params.projectId });
  const member = await Employee.findOne({ id: req.body.memberId });
  if(!project) return res.status(404).json({ message: 'Project not found' });
  if(!member) return res.status(404).json({ message: 'Employee not found' });

  try {
    
    // Check if member already exists
    if (!project.members.includes(member)) {
      project.members.push(member);
      await project.save();
    }

    res.json(project);
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ message: 'Error adding member', error: error.message });
  }
});


router.delete('/:projectId/remove-member', async (req, res) => {
  const { projectId } = req.params;
  const { memberId } = req.body;

  try {
    const project = await Project.findOne({ id: projectId });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const member = await Employee.findOne({ id: memberId });
    if (!member) return res.status(404).json({ message: 'Employee not found' });

    if (project.members.includes(member._id)) {
      project.members = project.members.filter(id => !id.equals(member._id));
      await project.save();
      res.json(project);
    } else {
      return res.status(400).json({ message: 'Member not found in project' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing member', error });
  }
});






  
module.exports = router; 