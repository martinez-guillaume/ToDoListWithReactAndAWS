import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Container from "react-bootstrap/Container";
import TaskCard from "../components/TaskCard";
import axios from "axios";
import "../App.css";

const CompletedTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchCompletedTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:3001/api/completed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Network response was not ok:", text);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchCompletedTasks();
    }
  }, [user, fetchCompletedTasks]);

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:3001/api/tasks/${taskId}`)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.TaskID !== taskId)
        );
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <Container>
      <h1 className="text-center py-10">Tâches Terminées</h1>
      <div className="flex justify-center pl-8 pb-10">
        <div className="flex flex-wrap gap-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.TaskID}
                task={task}
                onDelete={() => handleDelete(task.TaskID)}
                isCompleted={true}
              />
            ))
          ) : (
            <p>Aucune tâche complétée pour le moment.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CompletedTasks;
