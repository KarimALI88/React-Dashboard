import React, { useEffect, useState } from "react";
import "../css/main.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Professors() {
  const [professors, setProfessors] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/professors")
      .then((res) => {
        console.log(res.data);
        setProfessors(res.data);
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
      title: `are you sure to delete this user ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .delete(`http://localhost:3000/professors/${id}`)
          .then((res) => {
            console.log("deleted");
            setProfessors((prevProfs) => prevProfs.filter((prof) => prof.id !== id));
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleInputChange = (id, field, value) => {
    setProfessors((prevProfs) =>
    prevProfs.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  };

  return (
    <div>
      <h1 className="title">professors</h1>
      <div>
        <button className="add">
          <Link className="addlink" to={"/addprof"}>
            Add Professor <i className="fa-solid fa-plus"></i>
          </Link>
          
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Prof Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((professor) => (
            <tr key={professor.id}>
              <td>{professor.id}</td>
              <td>
                {editingId === professor.id ? (
                  <input
                    type="text"
                    value={professor.name}
                    onChange={(e) =>
                      handleInputChange(professor.id, "name", e.target.value)
                    }
                  />
                ) : (
                  professor.name
                )}
              </td>
              <td>
                {editingId === professor.id ? (
                  <input
                    type="text"
                    value={professor.age}
                    onChange={(e) =>
                      handleInputChange(professor.id, "age", e.target.value)
                    }
                  />
                ) : (
                  professor.age
                )}
              </td>
              <td>
                {editingId === professor.id ? (
                  <input
                    type="text"
                    value={professor.course}
                    onChange={(e) =>
                      handleInputChange(professor.id, "course", e.target.value)
                    }
                  />
                ) : (
                  professor.course
                )}
              </td>
              <td>
                {editingId === professor.id ? (
                  <button onClick={() => handleSave(professor.id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(professor.id)}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button onClick={() => handleDelete(professor.id)}>
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
  );
}

export default Professors;
