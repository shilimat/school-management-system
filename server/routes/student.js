const express = require('express');
const route= express.Router();
const studentController = require('../controller/studentController');

route.get('/all', studentController.allStudent);
route.post('/search', studentController.oneStudent);
route.post('/add', studentController.addStudent);
route.put('/update', studentController.updateStudent);
route.delete('/delete', studentController.deleteStudent);

module.exports = route ;