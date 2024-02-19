import React, { useEffect, useState } from "react";
import "../css/main.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
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
          .delete(`http://localhost:3000/users/${id}`)
          .then((res) => {
            console.log("deleted");
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleInputChange = (id, field, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <div>
        <button className="add">
          <Link className="addlink" to={"/adduser"}>
            Add User
          </Link>{" "}
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>college</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                      handleInputChange(user.id, "name", e.target.value)
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="text"
                    value={user.college}
                    onChange={(e) =>
                      handleInputChange(user.id, "college", e.target.value)
                    }
                  />
                ) : (
                  user.college
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="text"
                    value={user.GPA}
                    onChange={(e) =>
                      handleInputChange(user.id, "GPA", e.target.value)
                    }
                  />
                ) : (
                  user.GPA
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <button onClick={() => handleSave(user.id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user.id)}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button onClick={() => handleDelete(user.id)}>
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

export default Users;
