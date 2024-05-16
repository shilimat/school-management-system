const express = require('express');
const route= express.Router();
const attendanceController = require('../controller/attendanceController');

route.get('/all/:courseId', attendanceController.allCourseAttendance);
route.get('/all', attendanceController.allAttendance);
route.get('/search/:studentId:courseId', attendanceController.oneAttendance);
route.post('/add', attendanceController.addAttendance);
route.put('/update/:studentId:courseId', attendanceController.updateAttendance);
route.delete('/delete/:studentId:courseId', attendanceController.deleteAttendance);

module.exports = route ;