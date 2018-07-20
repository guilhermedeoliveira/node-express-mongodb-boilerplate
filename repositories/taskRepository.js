const mongoose = require('mongoose');
const Task = mongoose.model('Task');

const getAllTasks = async () => {
  const tasks = await Task.find();

  return tasks;
};

const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId);
  
  return task;
  };

const createTask = async (name) => {
  const task = new Task({
    name
  });

  await task.save();
};

const removeTaskById = async (taskId) => {
  const task = await Task.findByIdAndRemove(taskId);
  
  return task;
  };

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  removeTaskById
};
