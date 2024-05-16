require('dotenv').config;
const person= require('./model/person');
const express = require('express');
const app= express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/dbConn');
const path= require('path')
const StudentRouter = require('./routes/student');
const TeacherRouter = require('./routes/teacher');
const AttendanceRouter = require('./routes/attendance');
const CourseRouter = require('./routes/course');
const CollegeRouter = require('./routes/college');
const DepartmentRouter = require('./routes/department');
const UserRouter = require('./routes/user');
const cors = require('cors')

connectDB();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/public')));


app.use('/api/student', StudentRouter);
app.use('/api/teacher', TeacherRouter);
app.use('/api/course', CourseRouter);
app.use('/api/attendance', AttendanceRouter);
app.use('/api/college', CollegeRouter);
app.use('/api/department', DepartmentRouter);
app.use('/api/user', UserRouter);

mongoose.connection.once('open', () => {
    console.log("Mongoose Connected");
    app.listen(PORT, console.log("Server running on port 3500"));
});








