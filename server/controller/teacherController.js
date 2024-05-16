const Teacher = require('../model/teacher');


const generateTeacherId = async () => {
    try {
      // Get the last teacher with the highest teacherId
      const lastTeacher = await Teacher.findOne({}, 'teacherId', { sort: { teacherId: -1 } });
  
      let lastNumber = 0;
      if (lastTeacher) {
        const lastTeacherId = lastTeacher.teacherId;
        lastNumber = parseInt(lastTeacherId.substr(2), 10);
      }
  
      // Generate the new teacher ID with the incremented number
      const newNumber = lastNumber + 1;
      const paddedNumber = newNumber.toString().padStart(4, '0');
      const newTeacherId = 'T' + paddedNumber;
  
      return newTeacherId;
    } catch (error) {
      console.error('Error generating teacher ID:', error);
      throw error;
    }
  };

  const allTeacher = (req, res, next)=>{
    Teacher.find()
    .then(response => {
      res.json({data:response})
    })
    .catch(error => {
      res.json({message: 'An error Occured!'})
    })
  }

  const oneTeacher = (req, res, next) =>{
    let teacherID= req.body.teacherId
    Teacher.findOne({teacherId:teacherID})
    .then(response => {
        res.json({data:response})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })
}

const addTeacher = async (req, res, next) => {
    let teacher = new Teacher({
        teacherId: await generateTeacherId(),
        firstName: req.body.firstName,
        gender: req.body.gender,
        lastName: req.body.lastName,
        email: req.body.email,
        department: req.body.department,
        office: {
          building: req.body.office.building,
          roomNumber: req.body.office.roomNumber,
          officeHours: req.body.office.officeHours         
        },
        courses: req.body.courses

        })
    teacher.save()
    .then(response => {

        res.json({message: 'Teacher Added Successfully!'})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })   
}

const updateTeacher = (req, res, next) => {
    let teacherID = req.body.teacherId;
  
    Teacher.findOneAndUpdate({ teacherId: teacherID }, req.body, { useFindAndModify: false })
      .then(response => {
        res.json({ message: 'Teacher Updated Successfully!' });
      })
      .catch(error => {
        console.log(error);
        res.json({ message: 'An error Occurred!' });
      });
  };

const deleteTeacher = (req, res, next) => {
    let teacherID= req.body.teacherId;
    Teacher.findOneAndDelete(teacherID)
    .then(response => {
        res.json({message: 'Teacher deleted Successfully!'})
      })
      .catch(error => {
        console.log(error);
        res.json({message: 'An error Occured!'})
      })
}

module.exports = {allTeacher, oneTeacher, addTeacher, updateTeacher, deleteTeacher}
