const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");


// ================= CREATE TASK =================

router.post(
  "/",
  protect,
  createTask
);


// ================= GET ALL TASKS =================

router.get(
  "/all",
  protect,
  getAllTasks
);


// ================= GET PROJECT TASKS =================

router.get(
  "/project/:projectId",
  protect,
  getTasks
);


// ================= UPDATE TASK =================

router.put(
  "/:id",
  protect,
  updateTask
);


// ================= DELETE TASK =================

router.delete(
  "/:id",
  protect,
  deleteTask
);

module.exports = router;