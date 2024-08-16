import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const NewTaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Moyen',
    date: '',
    time: '',
    completed: false,
    assignee: '',
    tags: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted: ', formData);

    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Task added successfully');
        setFormData({
          title: '',
          description: '',
          priority: 'Moyen',
          date: '',
          time: '',
          completed: false,
          assignee: '',
          tags: '',
        }); 
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Nom de votre nouvelle tâche :</Form.Label>
        <Form.Control
          type="text"
          placeholder="Écrivez ici"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description de votre nouvelle tâche :</Form.Label>
        <Form.Control
          type="text"
          placeholder="Écrivez ici"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Priorité de votre nouvelle tâche :</Form.Label>
        <div key={"inline-radio"} className="mb-3">
          <Form.Check
            inline
            label="Élevé"
            name="priority"
            type="radio"
            id={"inline-radio-1"}
            value="Élevé"
            checked={formData.priority === 'Élevé'}
            onChange={handleChange}
          />
          <Form.Check
            inline
            label="Moyen"
            name="priority"
            type="radio"
            id={"inline-radio-2"}
            value="Moyen"
            checked={formData.priority === 'Moyen'}
            onChange={handleChange}
          />
          <Form.Check
            inline
            label="Basse"
            name="priority"
            type="radio"
            id={"inline-radio-3"}
            value="Basse"
            checked={formData.priority === 'Basse'}
            onChange={handleChange}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Date de votre nouvelle tâche :</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTime">
        <Form.Label>Heure de votre nouvelle tâche :</Form.Label>
        <Form.Control
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAssignee">
        <Form.Label>Responsable de la tâche :</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nom du responsable"
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTags">
        <Form.Label>Étiquettes (Tags) :</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ajouter des étiquettes séparées par des virgules"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Valider
      </Button>
    </Form>
  );
};

export default NewTaskForm;

