const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const studentSchema = new Schema({
  studentId: {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  contactNumber: {
    type: String,
    required: true,    
    match: /^(0|\+251)\d{9}$/ 
    
  },
  department: {
    type: String,
    required: true
  },
  gradeLevel: {
    type: Number,
    required: true,
    min: 1, 
    max: 6
  },
  semester: {
    type: Number,
    required: true,
    min: 1, // Minimum semester value validation
    max: 2
  },
  section: {
    type: String,
    required: true
  },
  enrolledCourses: {
    type: [String],
    required: false
  },
  transcript: [
    {
      courseId: {

        type: String,
        required:false
      },
      grade: {
        type: String,
        required:false

        
      }
    }
  ]
  

});

module.exports= mongoose.model('Student', studentSchema);