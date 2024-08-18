import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditTaskForm = () => {
  const { id } = useParams(); 
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
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Charge les données de la tâche existante lorsque le composant est monté
  useEffect(() => {
    const fetchTaskById = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const dateTime = data.DateTime || '';
          const date = dateTime.split('T')[0];
          const timeWithSeconds = dateTime.split('T')[1]?.split('Z')[0] || '';
          const time = timeWithSeconds.split(':').slice(0, 2).join(':'); 

          setFormData({
            title: data.Title || '',
            description: data.Description || '',
            priority: data.Priority || 'Moyen',
            date: date,
            time: time, 
            completed: data.CompletionStatus || false,
            assignee: data.Assignee || '',
            tags: data.Tags ? data.Tags.join(', ') : '',
          });
        } else {
          const text = await response.text();
          setError(`Unexpected response: ${text}`);
          console.error("Unexpected response:", text);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        setError(error.toString());
      }
    };

    fetchTaskById();
  }, [id]);

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

      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          date: formData.date,
          time: formData.time,
          DateTime: `${formData.date}T${formData.time}:00Z`,
          Tags: formData.tags.split(',').map(tag => tag.trim()),
        }),
      });

      if (response.ok) {
        console.log('Task updated successfully');
        navigate('/home'); // Redirige après la mise à jour
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Nom de la tâche :</Form.Label>
        <Form.Control
          type="text"
          placeholder="Écrivez ici"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description de la tâche :</Form.Label>
        <Form.Control
          type="text"
          placeholder="Écrivez ici"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Priorité :</Form.Label>
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
        <Form.Label>Date :</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTime">
        <Form.Label>Heure :</Form.Label>
        <Form.Control
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAssignee">
        <Form.Label>Responsable :</Form.Label>
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
        Sauvegarder
      </Button>
    </Form>
  );
};

export default EditTaskForm;
