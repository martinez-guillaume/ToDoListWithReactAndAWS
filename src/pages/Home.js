import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard'; 
import Container from 'react-bootstrap/Container';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <Container>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <h2>Todo List</h2>
      <div className="d-flex flex-wrap">
        {tasks.map(task => (
          <TaskCard key={task.TaskID} task={task} />
        ))}
      </div>
    </Container>
  );
};

export default Home;

