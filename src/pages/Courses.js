import React, { useEffect, useState } from "react";
import "../css/main.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses")
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    // Implement logic to update the user data
    setEditingId(null); // Reset editing mode after saving
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: `are you sure to delete this course ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .delete(`http://localhost:3000/courses/${id}`)
          .then((res) => {
            console.log("deleted");
            setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleInputChange = (id, field, value) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
      course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  return (
    <div>
      <h1 className='title'>courses</h1>
      <div>
        <button className="add">
          <Link className="addlink" to={"/addcourse"}>
            Add Course <i className="fa-solid fa-plus"></i>
          </Link>
          
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Num Of Students</th>
            <th>Num Of Profs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>
                {editingId === course.id ? (
                  <input
                    type="text"
                    value={course.courseName}
                    onChange={(e) =>
                      handleInputChange(course.id, "courseName", e.target.value)
                    }
                  />
                ) : (
                  course.courseName
                )}
              </td>
              <td>
                {editingId === course.id ? (
                  <input
                    type="text"
                    value={course.studentsInCourse}
                    onChange={(e) =>
                      handleInputChange(course.id, "studentsInCourse", e.target.value)
                    }
                  />
                ) : (
                  course.studentsInCourse
                )}
              </td>
              <td>
                {editingId === course.id ? (
                  <input
                    type="text"
                    value={course.professersForCourse}
                    onChange={(e) =>
                      handleInputChange(course.id, "professersForCourse", e.target.value)
                    }
                  />
                ) : (
                  course.professersForCourse
                )}
              </td>
              <td>
                {editingId === course.id ? (
                  <button onClick={() => handleSave(course.id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(course.id)}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button onClick={() => handleDelete(course.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Courses
