const express = require('express');
const route= express.Router();
const courseController = require('../controller/courseController');

route.get('/all', courseController.allCourse);
route.post('/search', courseController.oneCourse);
route.post('/add', courseController.addCourse);
route.put('/update', courseController.updateCourse);
route.delete('/delete', courseController.deleteCourse);

module.exports = route ;