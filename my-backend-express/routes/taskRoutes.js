const express = require('express');
const router = express.Router();
const authenticateToken = require('../../src/utils/authMiddleware');
const taskController = require('../controllers/taskController');

router.get('/tasks', authenticateToken, taskController.getTasks);
router.post('/tasks', authenticateToken, taskController.addTask);
router.get('/', authenticateToken, taskController.getTasks);
router.post('/', authenticateToken, taskController.addTask);

module.exports = router;