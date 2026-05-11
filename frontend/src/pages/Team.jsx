import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { getUsers } from "../api/authApi";

import toast from "react-hot-toast";

function Team() {

  const [members, setMembers] = useState([]);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {

    try {

      const res = await getUsers();

      setMembers(res.data.users);

    } catch (error) {

      toast.error("Failed to fetch team members");

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  return (

    <MainLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Team Members
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your team and roles 👨‍💻
          </p>

        </div>

        <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition">

          + Add Member

        </button>

      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {members.length === 0 ? (

          <div className="bg-[#0f172a] border border-white/10 p-10 rounded-3xl text-center text-gray-400 col-span-2">

            No team members found 🚀

          </div>

        ) : (

          members.map((member) => (

            <div
              key={member._id}
              className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition duration-300"
            >

              {/* Top */}
              <div className="flex items-center gap-4 mb-6">

                <img
                  src={`https://ui-avatars.com/api/?name=${member.name}&background=7c3aed&color=fff`}
                  alt=""
                  className="w-16 h-16 rounded-full"
                />

                <div>

                  <h2 className="text-2xl font-semibold">
                    {member.name}
                  </h2>

                  <p className="text-gray-400">
                    {member.role || "Team Member"}
                  </p>

                </div>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="bg-[#020617] p-4 rounded-2xl">

                  <p className="text-gray-400 mb-2">
                    Email
                  </p>

                  <h3 className="text-sm font-semibold break-all">
                    {member.email}
                  </h3>

                </div>

                <div className="bg-[#020617] p-4 rounded-2xl">

                  <p className="text-gray-400 mb-2">
                    Role
                  </p>

                  <h3 className="text-xl font-bold">
                    {member.role || "Member"}
                  </h3>

                </div>

              </div>

              {/* Productivity */}
              <div>

                <div className="flex justify-between mb-3">

                  <span className="text-gray-400">
                    Productivity
                  </span>

                  <span>
                    {Math.floor(Math.random() * 20) + 80}%
                  </span>

                </div>

                <div className="w-full h-3 bg-[#020617] rounded-full overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
                    style={{
                      width: `${Math.floor(Math.random() * 20) + 80}%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </MainLayout>

  );

}

export default Team;