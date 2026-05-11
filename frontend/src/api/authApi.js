import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// ================= TOKEN INTERCEPTOR =================

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {

    req.headers.Authorization = `Bearer ${token}`;

  }

  return req;

});


// ================= AUTH APIs =================

// Signup
export const signupUser = async (data) => {
  return API.post("/auth/signup", data);
};


// Login
export const loginUser = async (data) => {
  return API.post("/auth/login", data);
};


// ================= PROJECT APIs =================

// Create Project
export const createProject = async (data) => {
  return API.post("/projects", data);
};


// Get Projects
export const getProjects = async () => {
  return API.get("/projects");
};
// ================= TASK APIs =================

// Create Task
export const createTask = async (data) => {
  return API.post("/tasks", data);
};


// Get Tasks
export const getTasks = async (projectId) => {
  return API.get(`/tasks/project/${projectId}`);
};
// Get All Tasks
export const getAllTasks = async () => {
return API.get("/tasks/all");};
// ================= DASHBOARD =================

export const getDashboardStats = async () => {
  return API.get("/dashboard/stats");
};
// Update Task
export const updateTask = async (id, data) => {
  return API.put(`/tasks/${id}`, data);
};


// Delete Task
export const deleteTask = async (id) => {
  return API.delete(`/tasks/${id}`);
};
// Delete Project
export const deleteProject = async (id) => {

  return API.delete(
    `/projects/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );

};
// Get Users
export const getUsers = async () => {

  return API.get("/auth/users");

};