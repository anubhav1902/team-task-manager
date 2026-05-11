import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { getAllTasks } from "../api/authApi";
import toast from "react-hot-toast";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {

    try {

      const res = await getAllTasks();
      setTasks(res.data.tasks);

    } catch (error) {

      toast.error("Failed to fetch tasks");

    }

  };

  useEffect(() => {

    fetchTasks();

  }, []);

  return (

    <MainLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Tasks
          </h1>

          <p className="text-gray-400 mt-2">
            Track and manage all tasks ⚡
          </p>

        </div>

        <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition">

          + Add Task

        </button>

      </div>

      {/* Table */}
      <div className="bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-5 bg-white/5 p-5 font-semibold text-gray-300">

          <div>Task</div>

          <div>Project</div>

          <div>Priority</div>

          <div>Status</div>

          <div>Assignee</div>

        </div>

        {/* Table Rows */}
        {tasks.length === 0 ? (

          <div className="p-10 text-center text-gray-400">

            No tasks found 🚀

          </div>

        ) : (

          tasks.map((task) => (

            <div
              key={task._id}
              className="grid grid-cols-5 p-5 border-t border-white/5 hover:bg-white/5 transition"
            >

              {/* Task */}
              <div className="font-medium">
                {task.title}
              </div>

              {/* Project */}
              <div className="text-gray-400">

                {
                  task.project?.title ||
                  "No Project"
                }

              </div>

              {/* Priority */}
              <div>

                <span
                  className={`px-4 py-2 rounded-xl text-sm font-medium ${task.priority === "High"
                      ? "bg-red-500/20 text-red-400"
                      : task.priority === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                >
                  {task.priority}
                </span>

              </div>

              {/* Status */}
              <div>

                <span
                  className={`px-4 py-2 rounded-xl text-sm font-medium ${task.status === "Completed"
                      ? "bg-green-500/20 text-green-400"
                      : task.status === "In Progress"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                >
                  {task.status}
                </span>

              </div>

              {/* Assignee */}
              <div className="flex items-center gap-3">

                <img
                  src={`https://ui-avatars.com/api/?name=${task.assignedTo?.name || "User"
                    }&background=7c3aed&color=fff`}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />

                <span>

                  {
                    task.assignedTo?.name ||
                    "Unassigned"
                  }

                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </MainLayout>

  );

}

export default Tasks;