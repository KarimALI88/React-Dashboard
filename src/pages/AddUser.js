import React, { useState } from "react";
import "../css/main.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../css/adduser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [username, setUsername] = useState("");
  const [college, setCollege] = useState("");
  const [GPA, setGPA] = useState();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", {
        name: username,
        college: college,
        GPA: GPA,
      })
      .then((res) => {
        console.log(res.data);
        setSubmitted(true);
        setTimeout(() => {
          navigate("/users");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="title">ADD USER</h1>
      <Form onSubmit={handleSubmit}>
        <div className="form">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="label">User Name</Form.Label>
            <Form.Control
              className="input"
              type="text"
              placeholder="user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCollege">
            <Form.Label className="label">College</Form.Label>
            <Form.Control
              className="input"
              type="text"
              placeholder="College"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicGPA">
            <Form.Label className="label">GPA</Form.Label>
            <Form.Control
              className="input"
              type="text"
              placeholder="GPA"
              value={GPA}
              onChange={(e) => setGPA(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="submitButton">
          <Button className="submit" variant="primary" type="submit">
            Submit
          </Button>
        </div>
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

export default AddUser;
