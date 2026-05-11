import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/common/Navbar";

import {
  getDashboardStats,
  getAllTasks,
} from "../api/authApi";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

import toast from "react-hot-toast";

const COLORS = [
  "#22c55e",
  "#eab308",
  "#ef4444",
];

const lineData = [
  { day: "Mon", tasks: 4 },
  { day: "Tue", tasks: 7 },
  { day: "Wed", tasks: 5 },
  { day: "Thu", tasks: 9 },
  { day: "Fri", tasks: 6 },
  { day: "Sat", tasks: 11 },
];

function Dashboard() {

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });
  const [tasks, setTasks] = useState([]);

  // ================= FETCH DASHBOARD STATS =================
  const fetchDashboardStats = async () => {

    try {

      const res = await getDashboardStats();

      setStats(res.data);

    } catch (error) {

      toast.error("Failed to load dashboard stats");

    }

  };

  useEffect(() => {

    fetchDashboardStats();

    fetchTasks();

  }, []);

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {

    try {

      const res = await getAllTasks();

      setTasks(res.data.tasks);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= PIE DATA =================
  const pieData = [
    {
      name: "Completed",
      value: stats.completedTasks,
    },
    {
      name: "Pending",
      value: stats.pendingTasks,
    },
    {
      name: "Total Tasks",
      value: stats.totalTasks,
    },
  ];

  return (

    <MainLayout>

      {/* Navbar */}
      <Navbar />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* Total Projects */}
        <div className="bg-gradient-to-r from-purple-600/20 to-purple-900/20 border border-purple-500/20 p-6 rounded-3xl hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-400">
            Total Projects
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.totalProjects}
          </p>

        </div>

        {/* Completed Tasks */}
        <div className="bg-gradient-to-r from-green-600/20 to-green-900/20 border border-green-500/20 p-6 rounded-3xl hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-400">
            Completed Tasks
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.completedTasks}
          </p>

        </div>

        {/* Pending Tasks */}
        <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-900/20 border border-yellow-500/20 p-6 rounded-3xl hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-400">
            Pending Tasks
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.pendingTasks}
          </p>

        </div>

        {/* Total Tasks */}
        <div className="bg-gradient-to-r from-red-600/20 to-red-900/20 border border-red-500/20 p-6 rounded-3xl hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-400">
            Total Tasks
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.totalTasks}
          </p>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Section */}
        <div className="xl:col-span-2 bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

          <h2 className="text-3xl font-bold mb-6">
            Task Progress
          </h2>

          {/* Task Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Todo */}
            <div className="bg-[#020617] p-4 rounded-2xl hover:scale-[1.02] transition duration-300">

              <h3 className="font-semibold mb-4 text-yellow-400 text-lg">
                To Do
              </h3>

              {tasks
                .filter((task) => task.status
                  ?.toLowerCase()
                  .includes("todo"))
                .slice(0, 3)
                .map((task) => (

                  <div
                    key={task._id}
                    className="bg-white/5 p-3 rounded-xl hover:bg-white/10 transition"
                  >
                    {task.title}
                  </div>

                ))}

            </div>

            {/* In Progress */}
            <div className="bg-[#020617] p-4 rounded-2xl hover:scale-[1.02] transition duration-300">

              <h3 className="font-semibold mb-4 text-blue-400 text-lg">
                In Progress
              </h3>
              {tasks
                .filter((task) =>
                  task.status
                    ?.toLowerCase()
                    .includes("progress")
                )
                .slice(0, 3)
                .map((task) => (

                  <div
                    key={task._id}
                    className="bg-white/5 p-3 rounded-xl hover:bg-white/10 transition"
                  >
                    {task.title}
                  </div>

                ))}

            </div>

            {/* Completed */}
            <div className="bg-[#020617] p-4 rounded-2xl hover:scale-[1.02] transition duration-300">

              <h3 className="font-semibold mb-4 text-green-400 text-lg">
                Completed
              </h3>

              {tasks
                .filter((task) => task.status
                  ?.toLowerCase()
                  .includes("completed"))
                .slice(0, 3)
                .map((task) => (

                  <div
                    key={task._id}
                    className="bg-white/5 p-3 rounded-xl hover:bg-white/10 transition"
                  >
                    {task.title}
                  </div>

                ))}

            </div>

          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {/* Pie Chart */}
            <div className="bg-[#020617] p-4 rounded-2xl hover:scale-[1.01] transition duration-300">

              <h3 className="mb-4 font-semibold text-xl">
                Task Distribution
              </h3>

              <div className="h-[250px]">

                <ResponsiveContainer width="100%" height={250}>

                  <PieChart>

                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (

                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />

                      ))}
                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* Line Chart */}
            <div className="bg-[#020617] p-4 rounded-2xl hover:scale-[1.01] transition duration-300">

              <h3 className="mb-4 font-semibold text-xl">
                Weekly Productivity
              </h3>

              <div className="h-[250px]">

                <ResponsiveContainer width="100%" height={250}>

                  <LineChart data={lineData}>

                    <XAxis
                      dataKey="day"
                      stroke="#8884d8"
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="tasks"
                      stroke="#a855f7"
                      strokeWidth={3}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        </div>

        {/* Right Activity Panel */}
        <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

          <h2 className="text-3xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 hover:scale-[1.02] transition">
              ✅ New project created
            </div>

            <div className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 hover:scale-[1.02] transition">
              📋 Task added successfully
            </div>

            <div className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 hover:scale-[1.02] transition">
              🚀 Dashboard connected with MongoDB
            </div>

            <div className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 hover:scale-[1.02] transition">
              🔐 Authentication system active
            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default Dashboard;