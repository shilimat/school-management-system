const mongoose = require('mongoose');
const Attendance = require('../model/attendance'); // Assuming the schema is defined in a separate file


const addAttendance = async (req, res, next) => {
    let attendance = new Attendance({
        studentId: req.body.studentId,
        courseId: req.body.courseId,
        date: req.body.date,
        status: req.body.status,
        remarks: req.body.remarks,
        creationDate: new Date(),
        lastUpdateDate: new Date()
        })
    attendance.save()
    .then(response => {

        res.json({message: 'Attendance added successfully!'})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })   
}
   
const updateAttendance = (req, res, next) => {
      const { studentId, courseId } = req.params;
      const { status, remarks } = req.body;

      Attendance.findOneAndUpdate(
        { studentId: studentId, courseId: courseId },
        { status: status, remarks: remarks },
        { new: true }
      )
        .then(updatedAttendance => {
          if (!updatedAttendance) {
            return res.status(404).json({ error: 'Attendance record not found.' });
          }

          console.log('Updated attendance record:', updatedAttendance);
          res.status(200).json(updatedAttendance);
        })
        .catch(error => {
          console.error('Error while updating attendance record:', error);
          res.status(500).json({ error: 'An error occurred while updating the attendance record.' });
        });
  };
  

  const oneAttendance = (req, res, next) =>{
    const { studentId, courseId } = req.params;
    const query = Attendance.find();
    const conditions = [];

    if (studentId) {
      conditions.push({ studentId: studentId });
    }
    if (courseId) {
      conditions.push({ courseId: courseId });
    }

    if (conditions.length > 0) {
      query.and(conditions);
    }

    query.exec()
      .then(attendances => {
        console.log('Found attendances:', attendances);
        res.status(200).json(attendances);
      })
      .catch(error => {
        console.error('Error while searching for attendances:', error);
        res.status(500).json({ error: 'An error occurred while searching for attendances.' });
      })
}

const deleteAttendance = (req, res, next) => {
    const { studentId, courseId } = req.params;

    Attendance.findOneAndDelete({ studentId: studentId, courseId: courseId })
      .then(deletedAttendance => {
        if (!deletedAttendance) {
          return res.status(404).json({ error: 'Attendance record not found.' });
        }

        console.log('Deleted attendance record:', deletedAttendance);
        res.status(200).json({ message: 'Attendance record deleted successfully.' });
      })
      .catch(error => {
        console.error('Error while deleting attendance record:', error);
        res.status(500).json({ error: 'An error occurred while deleting the attendance record.' });
      });
}

const allAttendance = (req, res, next) => {
    Attendance.find()
    .then(attendanceRecords => {
      console.log('Attendance records:', attendanceRecords)});
}
            
//Read based on course
const allCourseAttendance = (req, res, next) => {
const { courseId } = req.params;

Attendance.find({ courseId: courseId })
  .then(attendances => {
    console.log('Found attendances:', attendances);
    res.status(200).json(attendances);
  })
  .catch(error => {
    console.error('Error while searching for attendances:', error);
    res.status(500).json({ error: 'An error occurred while searching for attendances.' });
  });

}


module.exports={allCourseAttendance, allAttendance, deleteAttendance, oneAttendance, updateAttendance, addAttendance}     