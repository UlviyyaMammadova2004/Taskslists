import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils';
import { UpdateTaskForm } from './UpdateTaskForm';

export const Task = ({ task, fetchTasks, onToggle }) => {
  const { _id, name, completed, steps = [] } = task;
  const [showSteps, setShowSteps] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${_id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task', err);
    }
  };

  return (
    <div className="task">
      <span className="taskCheckbox" onClick={() => onToggle(_id, completed)}>
        {completed ? '✅' : '🅾️'}
      </span>

      <div className={`taskText ${completed ? 'completed' : ''}`}>
        {name}
      </div>

      <button
        className="toggleStepsBtn"
        onClick={() => setShowSteps(!showSteps)}
      >
        {showSteps ? 'Hide Steps' : 'Show Steps'}
      </button>

      {showSteps && steps.length > 0 && (
        <ul className="stepsList">
          {steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      )}

      <div className="taskButtons">
        <button className="edit" onClick={() => setIsDialogOpen(true)}>
          ✏️
        </button>
        <button className="delete" onClick={handleDeleteTask}>
          🗑️
        </button>
      </div>

      {isDialogOpen && (
        <UpdateTaskForm
          task={task}
          fetchTasks={fetchTasks}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </div>
  );
};
