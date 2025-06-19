import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils";

export const AddTaskForm = ({ fetchTasks }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await axios.post(API_URL, { name: newTask });
      setNewTask("");
      fetchTasks(); 
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  return (
    <form className="addTaskForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit">+</button>
    </form>
  );
};
