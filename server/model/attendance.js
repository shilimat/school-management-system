const mongoose = require('mongoose');

// Define the Attendance schema
const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  remarks: {
    type: String
  },
  creationDate: {
    type: Date,
    required: true
  },

  lastUpdateDate: {
    type: Date,
    required: true
  }
});

// Create the Attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Export the Attendance model
module.exports = Attendance;