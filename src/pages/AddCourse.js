import React, { useState } from "react";
import "../css/main.css";
import "../css/addprof.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const [courseName, setCourseName] = useState();
  const [studentsInCourse, setStudentsInCourse] = useState();
  const [profsForCourse, setProfsForCourse] = useState();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/courses", {
        courseName: courseName,
        studentsInCourse: studentsInCourse,
        professersForCourse: profsForCourse,
      })
      .then((res) => {
        console.log(res.data);
        setSubmitted(true);
        setTimeout(() => {
          navigate("/courses");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="title">Add Course</h1>
      <Form onSubmit={handleSubmit} className="profForm">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="label">Course Name</Form.Label>
          <Form.Control
            className="profInput"
            type="text"
            placeholder="courseName "
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCollege">
          <Form.Label className="label">Num of Students</Form.Label>
          <Form.Control
            className="profInput"
            type="text"
            placeholder="Limit Num of Students"
            value={studentsInCourse}
            onChange={(e) => setStudentsInCourse(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGPA">
          <Form.Label className="label">Num of Profs</Form.Label>
          <Form.Control
            className="profInput"
            type="text"
            placeholder="Num of Profs"
            value={profsForCourse}
            onChange={(e) => setProfsForCourse(e.target.value)}
          />
        </Form.Group>

        <Button className="submit" variant="primary" type="submit">
          Submit
        </Button>

        {submitted ? (
          <Alert
            key={"success"}
            variant={"success"}
            style={{ marginTop: "20px" }}
          >
            Added
          </Alert>
        ) : null}
      </Form>
    </div>
  );
}

export default AddCourse;
