import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

const TaskCard = ({ task }) => {
  const priority = task.Priority ? task.Priority.trim().toLowerCase() : 'basse';

  // couleur de bordure en fonction de la priorité
  const borderColor = 
    priority === 'élevé' || priority === 'elevé' ? 'danger' : 
    priority === 'moyen' ? 'warning' : 
    'success'; // Valeur par défaut pour 'basse'

  const dateTime = new Date(task.DateTime);
  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString(); 

  return (
    <Card border={borderColor} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{task.Title}</Card.Title>
        <Card.Text>
          {task.Description}
        </Card.Text>
        <Card.Text>
          <strong>Priorité:</strong> {task.Priority}
        </Card.Text>
        <Card.Text>
          <strong>Date:</strong> {formattedDate}
        </Card.Text>
        <Card.Text>
          <strong>Heure:</strong> {formattedTime}
        </Card.Text>
        <Button variant="primary">Marquer comme terminé</Button>
      </Card.Body>
      <Card.Footer className="text-muted">
          <strong>À faire par :</strong> {task.Assignee}
      </Card.Footer>
    </Card>
  );
};

export default TaskCard;

