const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  deleteProject,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");


// Create Project
router.post(
  "/",
  protect,
  createProject
);


// Get Projects
router.get(
  "/",
  protect,
  getProjects
);

router.delete(
  "/:id",
  protect,
  deleteProject
);

module.exports = router;