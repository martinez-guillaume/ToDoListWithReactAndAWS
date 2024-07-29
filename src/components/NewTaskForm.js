import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const NewTaskForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nom de votre nouvelle tache :</Form.Label>
        <Form.Control type="text" placeholder="Ecrivez ici" />
        <Form.Label>Description de votre nouvelle tache :</Form.Label>
        <Form.Control type="text" placeholder="Ecrivez ici" />
        <Form.Label>Date de votre nouvelle tache :</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Valider
      </Button>
    </Form>
  );
};

export default NewTaskForm;