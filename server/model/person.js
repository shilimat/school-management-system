const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  personID : {
    type: String,
    required: true
  },
  name: {
    type : String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email:{ 
    type:String,
     required:true
},
courses:{
    type:[String],
    required: true
}
});
const Person = mongoose.model('Person', personSchema);
module.exports = personSchema;