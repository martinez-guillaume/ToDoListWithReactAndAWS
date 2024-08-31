import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import TaskCard from '../components/TaskCard';
import axios from 'axios';
import '../App.css'; 


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
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Network response was not ok:', text);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
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

  const handleTaskDeleted = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/tasks/${taskId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Task deleted successfully');
      setTasks(tasks.filter(task => task.TaskID !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskCompleted = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3001/api/tasks/${taskId}/completion`, 
      {
        completed: true,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Task marked as completed');
      setTasks(tasks.filter(task => task.TaskID !== taskId));
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  return (
    <Container>
      <h1 className="text-center py-10">Bienvenue dans Votre Espace de Tâches</h1>
      <div className="flex justify-center pl-8 pb-10">
        <div className="flex flex-wrap gap-4">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskCard 
                key={task.TaskID} 
                task={task} 
                onDelete={() => handleTaskDeleted(task.TaskID)} 
                onComplete={() => handleTaskCompleted(task.TaskID)} 
              />
            ))
          ) : (
            <p>Aucune tâche pour le moment.</p>
          )}
        </div>
      </div>
    </Container>
  );
};
  

export default Home;
