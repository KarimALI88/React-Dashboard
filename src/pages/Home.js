import React from "react";
import "../css/home.css";
import SideBar from "./../components/SideBar";
import {Routes, Route} from 'react-router-dom'
import AddUser from './AddUser';
import Users from "./Users";
import Professors from './Professors';
import Courses from './Courses';
import AddProf from "./AddProf";
import AddCourse from "./AddCourse";

function Home() {
  return (
    <div className="container-fluid homeContainer" >
      <div className="row">
        <div className="col-3">
          <SideBar />
        </div>
        <div className="col-9">
          <Routes>
            <Route path="/users" element={<Users/>}/>
            <Route path="/professors" element={<Professors/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/adduser" element={<AddUser/>}/>
            <Route path="/addprof" element={<AddProf/>}/>
            <Route path="/addcourse" element={<AddCourse/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Home;
