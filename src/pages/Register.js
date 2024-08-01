import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/register', formData);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Nom d'utilisateur</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrez votre nom d'utilisateur"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Entrez votre email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Entrez votre mot de passe"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirmez le mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirmez votre mot de passe"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        S'inscrire
      </Button>
    </Form>
  );
};

export default RegisterForm;
