const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {

  try {

    // Total Projects
    const totalProjects = await Project.countDocuments();

    // Total Tasks
    const totalTasks = await Task.countDocuments();

    // Completed Tasks
    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    // Pending Tasks
    const pendingTasks = await Task.countDocuments({
      status: {
        $ne: "Completed",
      },
    });

    res.status(200).json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getDashboardStats,
};