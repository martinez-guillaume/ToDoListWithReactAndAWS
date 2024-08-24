import React from 'react';
import EditTaskForm from '../components/EditTaskForm';
import pictureNewTask from '../pictureNewTask.png';

function EditTask() {
  return (
      <div>
    <h1 className="text-center pt-8">Édition de la tâche</h1>
    <p className="text-center">Modifiez maintenant votre tâche</p>
    
    {/* Conteneur flex pour aligner le formulaire et l'image côte à côte */}
    <div className="flex flex-row">
      
      {/* Formulaire */}
      <div className="w-full md:w-1/2 px-8 py-4">
      <EditTaskForm />
      </div>
      
      {/* Image */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <img
          src={pictureNewTask}
          alt="Description de l'image"
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
  </div>
);
};

export default EditTask;
