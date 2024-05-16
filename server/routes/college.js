const express = require('express');
const route= express.Router();
const collegeController = require('../controller/collegeController');

route.get('/all', collegeController.allCollege);
route.post('/search', collegeController.oneCollege);
route.post('/add', collegeController.addCollege);
route.put('/update', collegeController.updateCollege);
route.delete('/delete', collegeController.deleteCollege);

module.exports = route ;