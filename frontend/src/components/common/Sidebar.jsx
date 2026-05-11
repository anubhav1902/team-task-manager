import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Users,
    BarChart3,
    Settings,
    LogOut,
} from "lucide-react";

function Sidebar() {
    return (
        <div className="hidden md:flex w-[260px] bg-[#0f172a] border-r border-white/10 p-6 flex-col justify-between">

            <div>

                {/* Logo */}
                <div className="mb-12">

                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        TaskFlow
                    </h1>

                    <p className="text-gray-400 text-sm mt-2">
                        Team Management System
                    </p>

                </div>

                {/* Menu */}
                <div className="space-y-3">

                    {/* Dashboard */}
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 ${isActive
                                ? "bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-400 border border-purple-500/20"
                                : "hover:bg-white/5 text-white"
                            }`
                        }
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    {/* Projects */}
                    <NavLink
                        to="/projects"
                        className={({ isActive }) =>
                            `flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 ${isActive
                                ? "bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-400 border border-purple-500/20"
                                : "hover:bg-white/5 text-white"
                            }`
                        }
                    >
                        <FolderKanban size={20} />
                        Projects
                    </NavLink>

                    {/* Tasks */}
                    <NavLink
                        to="/tasks"
                        className={({ isActive }) =>
                            `flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 ${isActive
                                ? "bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-400 border border-purple-500/20"
                                : "hover:bg-white/5 text-white"
                            }`
                        }
                    >
                        <CheckSquare size={20} />
                        Tasks
                    </NavLink>

                    {/* Team */}
                    <NavLink
                        to="/team"
                        className={({ isActive }) =>
                            `flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 ${isActive
                                ? "bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-400 border border-purple-500/20"
                                : "hover:bg-white/5 text-white"
                            }`
                        }
                    >
                        <Users size={20} />
                        Team
                    </NavLink>

                    {/* Analytics */}
                    <NavLink
                        to="/analytics"
                        className={({ isActive }) =>
                            `flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 ${isActive
                                ? "bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-400 border border-purple-500/20"
                                : "hover:bg-white/5 text-white"
                            }`
                        }
                    >
                        <BarChart3 size={20} />
                        Analytics
                    </NavLink>

                    {/* Settings */}
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 ${isActive
                                ? "bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-400 border border-purple-500/20"
                                : "hover:bg-white/5 text-white"
                            }`
                        }
                    >
                        <Settings size={20} />
                        Settings
                    </NavLink>

                </div>

            </div>

            {/* User Card */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-lg">

                <div className="flex items-center gap-4 mb-4">

                    <img
                        src="https://ui-avatars.com/api/?name=Anubhav+Garg&background=7c3aed&color=fff"
                        alt="profile"
                        className="w-14 h-14 rounded-full"
                    />

                    <div>

                        <h2 className="font-semibold text-lg">
                            Anubhav Garg
                        </h2>

                        <p className="text-sm text-gray-400">
                            Admin
                        </p>

                    </div>

                </div>

                {/* Logout */}
                <button
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 p-3 rounded-2xl transition"
                >
                    <LogOut size={18} />
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Sidebar;