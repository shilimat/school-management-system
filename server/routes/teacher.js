const express = require('express');
const route= express.Router();
const teacherController = require('../controller/teacherController');

route.get('/all', teacherController.allTeacher);
route.post('/search', teacherController.oneTeacher);
route.post('/add', teacherController.addTeacher);
route.put('/update', teacherController.updateTeacher);
route.delete('/delete', teacherController.deleteTeacher);

module.exports = route ;