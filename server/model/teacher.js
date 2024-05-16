const mongoose= require('mongoose');
const Schema= mongoose.Schema;

// Teacher schema
const teacherSchema = new Schema({
  teacherId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  courses: [
    {
      courseId: {
        type: String,
        required: false
      },      
      semester: {
        type: String,
        required: false
      },
      section:{
        type: String,
        required: false
      }
      
    }
  ],
  office: {
    building: {
      type: Number,
      required: true
    },
    roomNumber: {
      type: Number,
      required: true
    },
    officeHours: {
      type: Number,
      required: true
    }
  }
});

// Create the Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;