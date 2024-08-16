import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard'; 
import Container from 'react-bootstrap/Container';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const fetchTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:3001/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Network response was not ok:', text);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Fetched tasks:', data); 
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

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