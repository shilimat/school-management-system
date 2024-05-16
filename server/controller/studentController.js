const Student = require('../model/student');


const generateStudentId = async () => {
  try {
    // Get the last student with the highest studentId
    const lastStudent = await Student.findOne({}, 'studentId', { sort: { studentId: -1 } });

    let lastNumber = 0;
    if (lastStudent) {
      const lastStudentId = lastStudent.studentId;
      lastNumber = parseInt(lastStudentId.substr(2), 10);
    }

    // Generate the new student ID with the incremented number
    const newNumber = lastNumber + 1;
    const paddedNumber = newNumber.toString().padStart(4, '0');
    const newStudentId = 'ST' + paddedNumber;

    return newStudentId;
  } catch (error) {
    console.error('Error generating student ID:', error);
    throw error;
  }
};

const allStudent = (req, res, next)=>{
  Student.find()
  .then(response => {
    res.json({data:response})
  })
  .catch(error => {
    res.json({message: 'An error Occured!'})
  })
}

const oneStudent = (req, res, next) =>{
    let studentID= req.body.studentId
    Student.findOne({studentId:studentID})
    .then(response => {
        res.json({data:response})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })
}

const addStudent = async (req, res, next) => {
    let student = new Student({
          studentId: await generateStudentId(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          dateOfBirth: req.body.dateOfBirth,
          gender: req.body.gender,
          address: {
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
            postalCode: req.body.address.postalCode,
            country: req.body.address.country
          },
          contactNumber: req.body.contactNumber, // Updated property name from phoneNumber to contactNumber
          department: req.body.department,
          gradeLevel: req.body.gradeLevel,
          semester: req.body.semester,
          section: req.body.section,
          enrolledCourses: req.body.enrolledCourses, // Removed square brackets []
          transcript: req.body.transcript
        })
    student.save()
    .then(response => {

        res.json({message: 'Student added successfully!'})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })   
}

const updateStudent = (req, res, next) => {
  let studentID = req.body.studentId;

  Student.findOneAndUpdate({ studentId: studentID }, req.body, { useFindAndModify: false })
    .then(response => {
      res.json({ message: 'Student Updated Successfully!' });
    })
    .catch(error => {
      console.log(error);
      res.json({ message: 'An error Occurred!' });
    });
};

const deleteStudent = (req, res, next) => {
    let studentID= req.body.studentId;
    Student.deleteOne({studentId: studentID})
    .then(response => {
        res.json({message: 'Student deleted Successfully!', data:response})
      })
      .catch(error => {
        console.log(error);
        res.json({message: 'An error Occured!'})
      })
}

module.exports = {allStudent, oneStudent, addStudent, updateStudent, deleteStudent}