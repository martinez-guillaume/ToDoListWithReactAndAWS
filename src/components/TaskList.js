import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onTaskDeleted }) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskCard key={task.TaskID} task={task} onDelete={() => onTaskDeleted(task.TaskID)} />
      ))}
    </div>
  );
};

export default TaskList;
