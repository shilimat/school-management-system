const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const courseSchema = new Schema({
  courseId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;