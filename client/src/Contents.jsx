import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Manage_Student from './Manage_Student';
import Manage_Courses from './Manage_Courses';
import Manage_College from './Manage_College';
import Manage_Departments from './Manage_Departments';
import Manage_Teacher from './Manage_Teacher';
import Manage_User from './Manage_User';

function Contents() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<div>Dashboard</div>}></Route>
            <Route path="/users" element={<Manage_User/>}></Route>
            <Route path="/manage-academics" element={<div>Academics</div>}></Route>
            <Route path="/courses" element={<Manage_Courses />}></Route>
            <Route path="/colleges" element={<Manage_College />}></Route>
            <Route path="/departments" element={<Manage_Departments/>}></Route>
            <Route path="/teacher" element={<Manage_Teacher/>}></Route>
            <Route path="/student" element={<Manage_Student />}></Route>
            <Route path="/events" element={<div>Student</div>}></Route>
            <Route path="/assign-and-schedule" element={<div>Student</div>}></Route>
        </Routes>
      
    </div>
  )
}

export default Contents
