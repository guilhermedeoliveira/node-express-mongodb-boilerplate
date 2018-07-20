const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/:taskId', authMiddleware, taskController.getTaskById);
router.post('/', authMiddleware, taskController.createTask);
router.delete('/:taskId', authMiddleware, taskController.removeTaskById);

module.exports = app => app.use('/api/tasks', router);
