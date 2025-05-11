import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddTaskForm } from './components/AddTaskForm';
import { Task } from './components/Task';
import { API_URL } from './utils';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    try {
      await axios.put(`${API_URL}/${taskId}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task completion", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <h1>My Task List</h1>
      <AddTaskForm fetchTasks={fetchTasks} />
      <div className="taskGrid">
        {tasks.map((task) => (
          <Task 
            key={task._id} 
            task={task} 
            onToggle={handleToggleTask}
            fetchTasks={fetchTasks} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
