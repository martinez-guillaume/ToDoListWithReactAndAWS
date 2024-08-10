import React, { useState, useEffect } from 'react';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer les tâches
    fetch('http://localhost:3001/api/tasks') // Assurez-vous que l'URL correspond à votre configuration
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <h2>Todo List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.TaskID}>
            <strong>{task.Title}</strong>: {task.Description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
