import React from "react";
import NewTaskForm from "../components/NewTaskForm";
import pictureNewTask from "../pictureNewTask.png";

const NewTask = () => {
  return (
    <div>
      <h1 className="text-center pt-8">Nouvelle tâche</h1>
      <p className="text-center">Ajoutez maintenant votre nouvelle tâche</p>

      {/* Conteneur flex pour aligner le formulaire et l'image côte à côte */}
      <div className="flex flex-row">
        {/* Formulaire */}
        <div className="w-full md:w-1/2 px-8 py-4">
          <NewTaskForm />
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

export default NewTask;
