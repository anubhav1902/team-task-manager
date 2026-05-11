import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";

import {
    createProject,
    getProjects,
    deleteProject,
} from "../api/authApi";

function Projects() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Planning",
        progress: 0,
    });

    // ================= FETCH PROJECTS =================
    const fetchProjects = async () => {

        try {

            const res = await getProjects();

            setProjects(res.data.projects);

        } catch (error) {

            toast.error("Failed to fetch projects");

        }

    };

    useEffect(() => {

        fetchProjects();

    }, []);

    // ================= HANDLE INPUT =================
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    // ================= CREATE PROJECT =================
    const handleCreateProject = async () => {

        try {

            setLoading(true);

            await createProject(formData);

            toast.success("Project created successfully 🚀");

            setShowModal(false);

            setFormData({
                title: "",
                description: "",
                status: "Planning",
                progress: 0,
            });

            fetchProjects();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create project"
            );

        } finally {

            setLoading(false);

        }

    };

    // ================= STATUS COLORS =================
    const getColor = (status) => {

        switch (status) {

            case "Completed":
                return "from-green-600 to-emerald-500";

            case "In Progress":
                return "from-purple-600 to-pink-500";

            case "Pending":
                return "from-blue-600 to-cyan-500";

            default:
                return "from-yellow-500 to-orange-500";

        }

    };
    const handleDeleteProject = async (id) => {

        try {

            await deleteProject(id);

            toast.success("Project deleted 🗑️");

            fetchProjects();

        } catch (error) {

            toast.error("Failed to delete project");

        }

    };

    return (

        <MainLayout>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Projects
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Manage all your projects here 🚀
                    </p>

                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
                >
                    + New Project
                </button>

            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {projects.map((project) => (

                    <div
                        key={project._id}
                        className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition duration-300"
                    >

                        {/* Top */}
                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-2xl font-semibold">
                                    {project.title}
                                </h2>

                                <p className="text-gray-400 mt-2">
                                    {project.description}
                                </p>

                            </div>

                            <span className="bg-white/10 px-4 py-2 rounded-xl text-sm">

                                {project.status}

                            </span>

                        </div>

                        {/* Progress */}
                        <div className="mb-4 flex justify-between text-sm">

                            <span className="text-gray-400">
                                Progress
                            </span>

                            <span className="font-semibold">
                                {project.progress}%
                            </span>

                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-3 bg-[#020617] rounded-full overflow-hidden">

                            <div
                                className={`h-full bg-gradient-to-r ${getColor(project.status)}`}
                                style={{
                                    width: `${project.progress}%`,
                                }}
                            ></div>

                        </div>

                        {/* Bottom */}
                        <div className="flex items-center justify-between mt-6">

                            <div className="flex -space-x-3">

                                <img
                                    src="https://i.pravatar.cc/40?img=1"
                                    alt=""
                                    className="w-10 h-10 rounded-full border-2 border-[#0f172a]"
                                />

                                <img
                                    src="https://i.pravatar.cc/40?img=2"
                                    alt=""
                                    className="w-10 h-10 rounded-full border-2 border-[#0f172a]"
                                />

                                <img
                                    src="https://i.pravatar.cc/40?img=3"
                                    alt=""
                                    className="w-10 h-10 rounded-full border-2 border-[#0f172a]"
                                />

                            </div>

                            <button
                                onClick={() =>
                                    navigate(`/projects/${project._id}`)
                                }
                                className="text-purple-400 hover:text-purple-300"
                            >
                                View Details →
                            </button>
                            <button
                                onClick={() =>
                                    handleDeleteProject(project._id)
                                }
                                className="text-red-400 hover:text-red-300"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {/* ================= MODAL ================= */}
            {showModal && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

                    <div className="bg-[#0f172a] p-8 rounded-3xl w-full max-w-lg border border-white/10">

                        <h2 className="text-3xl font-bold mb-6">
                            Create Project 🚀
                        </h2>

                        {/* Title */}
                        <input
                            type="text"
                            name="title"
                            placeholder="Project Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full mb-4 bg-[#020617] p-4 rounded-xl outline-none border border-white/10"
                        />

                        {/* Description */}
                        <textarea
                            name="description"
                            placeholder="Project Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full mb-4 bg-[#020617] p-4 rounded-xl outline-none border border-white/10 h-28"
                        />

                        {/* Status */}
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full mb-4 bg-[#020617] p-4 rounded-xl outline-none border border-white/10"
                        >
                            <option>Planning</option>
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>

                        {/* Progress */}
                        <input
                            type="number"
                            name="progress"
                            placeholder="Progress %"
                            value={formData.progress}
                            onChange={handleChange}
                            className="w-full mb-6 bg-[#020617] p-4 rounded-xl outline-none border border-white/10"
                        />

                        {/* Buttons */}
                        <div className="flex gap-4">

                            <button
                                onClick={handleCreateProject}
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 p-4 rounded-xl font-semibold hover:scale-[1.02] transition"
                            >
                                {
                                    loading
                                        ? "Creating..."
                                        : "Create Project"
                                }
                            </button>

                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </MainLayout>

    );

}

export default Projects;