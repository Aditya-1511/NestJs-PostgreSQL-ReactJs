import React from 'react';
import './innerHomepage.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function InnerHomepage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/users/getAllUsers', {})
      // .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data.data);
      })
      .catch((error) => console.log(error));
  }, [setData]);

  const deleteUser = (id) => {
    // console.log(id, '---');
    axios
      .delete(`http://localhost:8000/users/delete/${id}`, {})
      .then((res) => {
        axios.get('http://localhost:8000/users/getAllUsers', {}).then((res) => {
          setData(res.data);
        });
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();

  const handleGetUser = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="innerHomepage">
      <div>
        <h1>User List</h1>
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => handleGetUser(item.id)}
                  >
                    View Profile
                  </Button>
                  <Button variant="danger" onClick={() => deleteUser(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InnerHomepage;
