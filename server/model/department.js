const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  collegeId: {
    type: String,
    required: true
  },
  departmentId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  headOfDepartment: {
    type: String,
    required: true
  },
  contactDetails: {
    type: String,
    required: true
  }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;