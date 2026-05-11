import MainLayout from "../layouts/MainLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const productivityData = [
  { month: "Jan", tasks: 20 },
  { month: "Feb", tasks: 35 },
  { month: "Mar", tasks: 28 },
  { month: "Apr", tasks: 45 },
  { month: "May", tasks: 40 },
  { month: "Jun", tasks: 55 },
];

const teamData = [
  { name: "Completed", value: 70 },
  { name: "Pending", value: 20 },
  { name: "Overdue", value: 10 },
];

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

const performanceData = [
  { week: "W1", performance: 65 },
  { week: "W2", performance: 80 },
  { week: "W3", performance: 72 },
  { week: "W4", performance: 90 },
];

function Analytics() {
  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-400 mt-2">
          Monitor project productivity and team insights 📊
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

          <p className="text-gray-400 mb-2">
            Total Tasks
          </p>

          <h2 className="text-4xl font-bold">
            245
          </h2>

        </div>

        <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

          <p className="text-gray-400 mb-2">
            Productivity
          </p>

          <h2 className="text-4xl font-bold text-green-400">
            89%
          </h2>

        </div>

        <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

          <p className="text-gray-400 mb-2">
            Team Members
          </p>

          <h2 className="text-4xl font-bold">
            12
          </h2>

        </div>

        <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

          <p className="text-gray-400 mb-2">
            Active Projects
          </p>

          <h2 className="text-4xl font-bold text-purple-400">
            8
          </h2>

        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">

        {/* Bar Chart */}
        <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

          <h2 className="text-2xl font-semibold mb-6">
            Monthly Productivity
          </h2>

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={productivityData}>

                <XAxis dataKey="month" stroke="#94a3b8" />

                <Tooltip />

                <Bar
                  dataKey="tasks"
                  fill="#a855f7"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Pie Chart */}
        <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

          <h2 className="text-2xl font-semibold mb-6">
            Task Status
          </h2>

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={teamData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                >

                  {teamData.map((entry, index) => (
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
        <div className="col-span-2 bg-[#0f172a] border border-white/10 p-6 rounded-3xl">

          <h2 className="text-2xl font-semibold mb-6">
            Weekly Team Performance
          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={performanceData}>

                <XAxis dataKey="week" stroke="#94a3b8" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#ec4899"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Analytics;