const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  collegeId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dean: {
    type: String,
    required: true
  },
  contactDetails: {
    type: String,
    required: true
  }
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;