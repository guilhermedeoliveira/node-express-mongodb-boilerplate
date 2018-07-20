const taskRepository = require('../repositories/taskRepository');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskRepository.getAllTasks();

    return res.send(tasks);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const getTaskById = async (req, res) => {
    const { taskId } = req.params;

    try {
      const task = await taskRepository.getTaskById(taskId);
  
      return res.send(task);
    } catch (error) {
      return res.status(400).send({ error });
    }
  };

const createTask = async (req, res) => {
  const { name } = req.body;

  try {
    const task = await taskRepository.createTask(name);

    return res.send(task);
  } catch (err) {
    return res.status(400).send({ error });
  }
};


const removeTaskById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await taskRepository.removeTaskById(taskId);

    return res.send(task);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  removeTaskById
};