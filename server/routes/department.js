const express = require('express');
const route= express.Router();
const departmentController = require('../controller/departmentController');

route.get('/all', departmentController.allDepartment);
route.post('/search', departmentController.oneDepartment);
route.post('/add', departmentController.addDepartment);
route.put('/update', departmentController.updateDepartment);
route.delete('/delete', departmentController.deleteDepartment);

module.exports = route ;