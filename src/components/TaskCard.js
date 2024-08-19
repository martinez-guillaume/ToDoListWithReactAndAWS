import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, onDelete }) => {

  const navigate = useNavigate();
  const priority = task.Priority ? task.Priority.trim().toLowerCase() : 'basse';

  // Couleur de bordure en fonction de la priorité
  const borderColor = 
    priority === 'élevé' || priority === 'elevé' ? 'danger' : 
    priority === 'moyen' ? 'warning' : 
    'success'; // Valeur par défaut pour 'basse'

  // Formatage de la date et de l'heure
  const dateTime = new Date(task.DateTime);
  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString(); 

  // Fonction de navigation vers la page d'édition
  const handleEditClick = () => {
    navigate(`/edit-task/${task.TaskID}`);
  };

  // Appel de la fonction onDelete passée en props
  const handleDeleteClick = () => {
    if (typeof onDelete === 'function') {
      onDelete();
    }
  };

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
        <div className="d-flex justify-content-between mt-2">
          <Button variant="success" className="me-2">Terminé <FontAwesomeIcon icon={faCheck} style={{ paddingLeft: '10px' }} /></Button>
          <Button variant="warning" className="me-2" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <strong>À faire par :</strong> {task.Assignee}
      </Card.Footer>
    </Card>
  );
};

export default TaskCard;
