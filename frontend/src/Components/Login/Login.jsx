import React from 'react';
import { useState, useEffect } from 'react';
// import axios from 'axios';
import './login.css';
import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUser } from '../../API/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, password };
    const response = await loginUser(body);
    if (response && response.status === 201) {
      toast.success(response?.data?.message || 'Login successful', {
        position: 'top-right',
        autoClose: 2000,
      });
      setToken(response?.data?.token);
    } else {
      toast.error(response?.response?.data?.message || 'Invalid Credentials', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
    console.log(response);
  };

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/innerHome');
  };

  const handleRegisterButton = () => {
    navigate('/register');
  };

  useEffect(() => {
    if (token) {
      handleRegister();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="loginForm">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
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
        <h4>
          Not registered yet ? Click{' '}
          <Button variant="warning" onClick={handleRegisterButton}>
            Register
          </Button>
        </h4>
        {/* <ToastContainer /> */}
      </Form>
    </div>
  );
}

export default Login;
