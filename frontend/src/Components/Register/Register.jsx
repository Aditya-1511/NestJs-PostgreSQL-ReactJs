import React from 'react';
import './register.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name, email, password);
    axios
      .post('http://localhost:8000/users/register', {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        // console.log(res);
        setToken(true);
        toast.success(res?.data?.message || 'Registration successful', {
          position: 'top-right',
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message, {
          position: 'top-right',
          autoClose: 4000,
        });
      });
  };

  const handleRegister = () => {
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (token) {
      handleRegister();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="regForm">
      <h1>Registration Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="formLabel">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="formLabel">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="formLabel">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* <ToastContainer /> */}
        <h4>
          Already registered ? Click{' '}
          <Button variant="success" onClick={handleLogin}>
            Login
          </Button>
        </h4>
      </Form>
    </div>
  );
}

export default Register;
