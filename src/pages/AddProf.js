import React, { useState } from "react";
import "../css/main.css";
import "../css/addprof.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProf() {
  const [profName, setProfName] = useState();
  const [profAge, setProfAge] = useState();
  const [profCourse, setProfCourse] = useState();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/professors", {
        name: profName,
        age: profAge,
        course: profCourse,
      })
      .then((res) => {
        console.log(res.data);
        setSubmitted(true);
        setTimeout(() => {
          navigate("/professors");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="title">Add Prof</h1>
      <Form onSubmit={handleSubmit} className="profForm">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="label">Prof Name</Form.Label>
          <Form.Control
            className="profInput"
            type="text"
            placeholder="prof name"
            value={profName}
            onChange={(e) => setProfName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCollege">
          <Form.Label className="label">Prof Age</Form.Label>
          <Form.Control
            className="profInput"
            type="text"
            placeholder="prof age"
            value={profAge}
            onChange={(e) => setProfAge(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGPA">
          <Form.Label className="label">Course</Form.Label>
          <Form.Control
            className="profInput"
            type="text"
            placeholder="prof course"
            value={profCourse}
            onChange={(e) => setProfCourse(e.target.value)}
            required
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

export default AddProf;
