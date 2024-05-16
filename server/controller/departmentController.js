const Department = require('../model/department');


const generateDepartmentId = async () => {
  try {
    // Get the last student with the highest studentId
    const lastDepartment = await Department.findOne({}, 'departmentId', { sort: { courseId: -1 } });

    let lastNumber = 0;
    if (lastDepartment) {
      const lastDepartmentId = lastDepartment.departmentId;
      lastNumber = parseInt(lastDepartmentId.substr(2), 10);
    }

    // Generate the new student ID with the incremented number
    const newNumber = lastNumber + 1;
    const paddedNumber = newNumber.toString().padStart(2, '0');
    const newDepartmentId = 'DT' + paddedNumber;

    return newDepartmentId;
  } catch (error) {
    console.error('Error generating department ID:', error);
    throw error;
  }
};

const allDepartment = (req, res, next)=>{
    Department.find()
  .then(response => {
    res.json({data:response})
  })
  .catch(error => {
    res.json({message: 'An error Occured!'})
  })
}

const oneDepartment = (req, res, next) =>{
    let departmentID= req.body.departmentId
    Department.findOne({departmentId:departmentID})
    .then(response => {
        res.json({data:response})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })
}

const addDepartment = async (req, res, next) => {
    let department = new Department({
          departmentId: await generateDepartmentId(),
          collegeId: req.body.collegeId,
          name: req.body.name,
          headOfDepartment: req.body.headOfDepartment,
          contactDetails: req.body.contactDetails          
        })
    department.save()
    .then(response => {

        res.json({message: 'Department added successfully!'})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })   
}

const updateDepartment = (req, res, next) => {
  let departmentID = req.body.departmentId;

  Department.findOneAndUpdate({ departmentId: departmentID }, req.body, { useFindAndModify: false })
    .then(response => {
      res.json({ message: 'Department Updated Successfully!' });
    })
    .catch(error => {
      console.log(error);
      res.json({ message: 'An error Occurred!' });
    });
};

const deleteDepartment = (req, res, next) => {
    let departmentID= req.body.departmentId;
    Department.findOneAndDelete({departmentId: departmentID})
    .then(response => {
        res.json({message: 'Department deleted Successfully!', data:response})
      })
      .catch(error => {
        console.log(error);
        res.json({message: 'An error Occured!'})
      })
}

module.exports = {allDepartment, oneDepartment, addDepartment, updateDepartment, deleteDepartment}