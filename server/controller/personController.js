const Person = require('../model/person');

const allPerson = (req, res, next)=>{
  Student.find()
  .then(response => {
    res.json({response})
  })
  .catch(error => {
    res.json({message: 'An error Occured!'})
  })
}

const onePerson = (req, res, next) =>{
    let personID= req.body.personID
    Student.findById(studentID)
    .then(response => {
        res.json({response})
      })
      .catch(error => {
        res.json({message: 'An error Occured!'})
      })
}