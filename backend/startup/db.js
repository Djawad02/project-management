const mongoose = require('mongoose');


module.exports = function() {
    // const db = config.get('db');
    mongoose.connect('mongodb://localhost/ProjectManagement')
    .then(() =>{ 
        console.log('Connected to MongoDB...');
    })
    .catch(err => console.error('Could not connect to MongoDB...'));
}