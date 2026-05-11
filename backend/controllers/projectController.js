const Project = require("../models/Project");
const Task = require("../models/Task");


// ================= CREATE PROJECT =================

const createProject = async (req, res) => {

  try {

    const {
      title,
      description,
      status,
      progress,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      status,
      progress,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ================= GET ALL PROJECTS =================

const getProjects = async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      projects,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ================= DELETE PROJECT =================

const deleteProject = async (req, res) => {

  try {

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {

      return res.status(404).json({
        message: "Project not found",
      });

    }

    // Delete related tasks
    await Task.deleteMany({
      project: req.params.id,
    });

    // Delete project
    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
module.exports = {
  createProject,
  getProjects,
  deleteProject,
};