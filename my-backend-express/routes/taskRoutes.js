const express = require("express");
const router = express.Router();
const authenticateToken = require("../../src/utils/authMiddleware");
const taskController = require("../controllers/taskController");

router.get("/tasks", authenticateToken, taskController.getTasks);
router.post("/tasks", authenticateToken, taskController.addTask);
router.get("/", authenticateToken, taskController.getTasks);
router.post("/", authenticateToken, taskController.addTask);
router.get("/tasks/:id", authenticateToken, taskController.getTaskById);
router.put("/tasks/:id", authenticateToken, taskController.updateTask);
router.delete("/tasks/:id", authenticateToken, taskController.deleteTask);
router.patch(
  "/tasks/:id/completion",
  authenticateToken,
  taskController.updateTaskCompletionStatus
);
router.get("/completed", authenticateToken, taskController.getCompletedTasks);

module.exports = router;
