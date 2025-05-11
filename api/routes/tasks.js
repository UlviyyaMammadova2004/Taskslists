const express = require("express");
const router = express.Router();
const { Task } = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find().sort({ _id: -1 });
  res.json(tasks);
});

// POST create task
router.post("/", async (req, res) => {
  const { name, steps = [] } = req.body;
  const task = new Task({ name, steps });
  await task.save();
  res.status(201).json(task);
});

// PUT update task
router.put("/:id", async (req, res) => {
  const { name, completed, steps = [] } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { name, completed, steps },
    { new: true }
  );
  res.json(task);
});

// DELETE task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
