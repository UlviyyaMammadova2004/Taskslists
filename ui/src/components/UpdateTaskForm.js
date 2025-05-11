import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils";

export const UpdateTaskForm = ({ task, fetchTasks, isDialogOpen, setIsDialogOpen }) => {
  const [name, setName] = useState(task.name);
  const [steps, setSteps] = useState(task.steps || []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${task._id}`, {
        name,
        completed: task.completed,
        steps,
      });
      fetchTasks();
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const handleStepChange = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const addStep = () => setSteps([...steps, ""]);
  const removeStep = (index) => setSteps(steps.filter((_, i) => i !== index));

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task name"
            required
          />
          <h4>Steps</h4>
          {steps.map((step, index) => (
            <div key={index} className="step-row">
              <input
                type="text"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
              />
              <button type="button" onClick={() => removeStep(index)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={addStep}>➕ Add Step</button>
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsDialogOpen(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
