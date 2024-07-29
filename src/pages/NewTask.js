import React from 'react';
import NewTaskForm from '../components/NewTaskForm';

const NewTask = () => {
  return (
    <div>
      <h1>Nouvelle tache</h1>
      <p>Ajoutez maintenant votre nouvelle tache</p>
      <NewTaskForm/>
    </div>
  );
};

export default NewTask;
