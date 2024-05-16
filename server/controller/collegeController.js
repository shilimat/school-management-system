const College = require('../model/college');


const generateCollegeId = async () => {
  try {
    // Get the last student with the highest studentId
    const lastCollege = await College.findOne({}, 'collegeId', { sort: { collegeId: -1 } });

    let lastNumber = 0;
    if (lastCollege) {
      const lastCollegeId = lastCollege.collegeId;
      lastNumber = parseInt(lastCollegeId.substr(1), 10);
    }

    // Generate the new student ID with the incremented number
    const newNumber = lastNumber + 1;
    const paddedNumber = newNumber.toString().padStart(3, '0');
    const newCollegeId = 'C' + paddedNumber;

    return newCollegeId;
  } catch (error) {
    console.error('Error generating college ID:', error);
    throw error;
  }
};

const allCollege = (req, res, next)=>{
  College.find()
  .then(response => {
    res.json({data:response})
  })
  .catch(error => {
    res.json({message: 'An error Occured!'})
  })
}

const oneCollege = (req, res, next) =>{
    let collegeID= req.body.collegeId
    College.findOne({collegeId:collegeID})
    .then(response => {
        res.json({data:response})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })
}

const addCollege = async (req, res, next) => {
    let college = new College({
          collegeId: await generateCollegeId(),
          name: req.body.name,
          location: req.body.location,
          dean: req.body.dean,
          contactDetails: req.body.contactDetails

        })
    college.save()
    .then(response => {

        res.json({message: 'College added successfully!'})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })   
}

const updateCollege = (req, res, next) => {
  let collegeID = req.body.collegeId;

  College.findOneAndUpdate({ collegeId: collegeID }, req.body, { useFindAndModify: false })
    .then(response => {
      res.json({ message: 'college Updated Successfully!' });
    })
    .catch(error => {
      console.log(error);
      res.json({ message: 'An error Occurred!' });
    });
};

const deleteCollege = (req, res, next) => {
    let collegeID= req.body.collegeId;
    College.findOneAndDelete({collegeId: collegeID})
    .then(response => {
        res.json({message: 'college deleted Successfully!', data:response})
      })
      .catch(error => {
        console.log(error);
        res.json({message: 'An error Occured!'})
      })
}

module.exports = {allCollege, oneCollege, addCollege, updateCollege, deleteCollege}