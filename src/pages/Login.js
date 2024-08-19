import React, { useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setError(''); 
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      console.log('Login response:', response.data);
      
      if (response.data?.token && response.data?.user) {
        login(response.data.token, response.data.user); 
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('user', JSON.stringify(response.data.user)); 
        console.log(response.data.token);
        navigate('/'); 
      } else {
        setError('Invalid login attempt');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials'); 
      } else {
        setError('An error occurred. Please try again later.'); 
      }
    }
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Entrez votre email"
          name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
                name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            </Form.Group>
      
            <Button variant="primary" type="submit">
              Se connecter
            </Button>
          </Form>
        );
      };

export default Login;
