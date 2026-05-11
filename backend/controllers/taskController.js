const Task = require("../models/Task");


// ================= CREATE TASK =================

const createTask = async (req, res) => {

  try {

    const {
      title,
      status,
      priority,
      dueDate,
      project,
      assignedTo,
    } = req.body;

    const task = await Task.create({
      title,
      status,
      priority,
      dueDate,
      project,
      assignedTo,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ================= GET TASKS =================

const getTasks = async (req, res) => {

  try {

    const { projectId } = req.params;

    const tasks = await Task.find({
  project: req.params.projectId,
})
      .populate("assignedTo", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      tasks,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
// ================= GET ALL TASKS =================

const getAllTasks = async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("project")
      .populate("assignedTo", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      tasks,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
// ================= UPDATE TASK =================

const updateTask = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Task updated successfully",
      updatedTask,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ================= DELETE TASK =================

const deleteTask = async (req, res) => {

  try {

    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  createTask,
  getTasks,
  getAllTasks,
  updateTask,
  deleteTask,
};