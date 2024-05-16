const Course = require('../model/courses');


const generateCourseId = async () => {
  try {
    // Get the last student with the highest studentId
    const lastCourse = await Course.findOne({}, 'courseId', { sort: { courseId: -1 } });

    let lastNumber = 0;
    if (lastCourse) {
      const lastCourseId = lastCourse.courseId;
      lastNumber = parseInt(lastCourseId.substr(2), 10);
    }

    // Generate the new student ID with the incremented number
    const newNumber = lastNumber + 1;
    const paddedNumber = newNumber.toString().padStart(3, '0');
    const newCourseId = 'CS' + paddedNumber;

    return newCourseId;
  } catch (error) {
    console.error('Error generating course ID:', error);
    throw error;
  }
};

const allCourse = (req, res, next)=>{
  Course.find()
  .then(response => {
    res.json({data:response})
  })
  .catch(error => {
    res.json({message: 'An error Occured!'})
  })
}

const oneCourse = (req, res, next) =>{
    let courseID= req.body.courseId
    Course.findOne({courseId:courseID})
    .then(response => {
        res.json({data:response})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })
}

const addCourse = async (req, res, next) => {
    let course = new Course({
          courseId: await generateCourseId(),
          name: req.body.name,
          credits: req.body.credits          
        })
    course.save()
    .then(response => {

        res.json({message: 'Course added successfully!'})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })   
}

const updateCourse = (req, res, next) => {
  let courseID = req.body.courseId;

  Course.findOneAndUpdate({ courseId: courseID }, req.body, { useFindAndModify: false })
    .then(response => {
      res.json({ message: 'course Updated Successfully!' });
    })
    .catch(error => {
      console.log(error);
      res.json({ message: 'An error Occurred!' });
    });
};

const deleteCourse = (req, res, next) => {
    let courseID= req.body.courseId;
    Course.findOneAndDelete({courseId: courseID})
    .then(response => {
        res.json({message: 'course deleted Successfully!', data:response})
      })
      .catch(error => {
        console.log(error);
        res.json({message: 'An error Occured!'})
      })
}

module.exports = {allCourse, oneCourse, addCourse, updateCourse, deleteCourse}