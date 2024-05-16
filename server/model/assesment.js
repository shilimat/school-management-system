const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Assessment schema
const assessmentSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  test: {
    type: Number,
    required: true
  },
  quiz: {
    type: Number,
    required: true
  },
  lab: {
    type: Number,
    required: true
  },
  project: {
    type: Number,
    required: true
  },
  final: {
    type: Number,
    required: true
  }
});

assessmentSchema.pre('validate', function(next) {
  const totalMarks = this.test + this.quiz + this.lab + this.project;
  if (totalMarks > 50) {
    this.invalidate(
      'test',
      'Sum of test, quiz, lab, and project marks cannot be greater than 50'
    );
  }
  next();
});

// Create the Assessment model
const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;