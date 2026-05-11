import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { getUsers } from "../api/authApi";

import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";

import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../api/authApi";

import toast from "react-hot-toast";

function ProjectDetails() {

    const { id } = useParams();

    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        status: "Todo",
        priority: "Medium",
        dueDate: "",
        assignedTo: "",
    });

    // ================= FETCH TASKS =================
    const fetchTasks = async () => {

        try {

            const res = await getTasks(id);

            setTasks(res.data.tasks);

        } catch (error) {

            toast.error("Failed to fetch tasks");

        }

    };

   useEffect(() => {

    fetchTasks();

    fetchUsers();

    // eslint-disable-next-line

}, []);
    // ================= HANDLE INPUT =================
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    // ================= CREATE TASK =================
    const handleCreateTask = async () => {

        try {

            setLoading(true);

            await createTask({
                ...formData,
                project: id,
            });

            toast.success("Task created successfully 🚀");

            setShowModal(false);

            setFormData({
                title: "",
                status: "Todo",
                priority: "Medium",
                dueDate: "",
            });

            fetchTasks();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create task"
            );

        } finally {

            setLoading(false);

        }

    };

    // ================= DRAG FUNCTION =================
    const handleDragEnd = async (result) => {

        if (!result.destination) return;

        const taskId = result.draggableId;

        const newStatus = result.destination.droppableId;

        try {

            await updateTask(taskId, {
                status: newStatus,
            });

            fetchTasks();

        } catch (error) {

            toast.error("Failed to move task");

        }

    };

    // ================= MOVE BUTTON =================
    const handleMoveTask = async (
        taskId,
        currentStatus
    ) => {

        let nextStatus = "Todo";

        if (currentStatus === "Todo") {

            nextStatus = "In Progress";

        } else if (currentStatus === "In Progress") {

            nextStatus = "Completed";

        }

        try {

            await updateTask(taskId, {
                status: nextStatus,
            });

            fetchTasks();

        } catch (error) {

            toast.error("Failed to update task");

        }

    };


    // ================= DELETE TASK =================
    const handleDeleteTask = async (taskId) => {

        try {

            await deleteTask(taskId);

            toast.success("Task deleted 🗑️");

            fetchTasks();

        } catch (error) {

            toast.error("Failed to delete task");

        }

    };

    // ================= TASK COLUMN =================
    const renderColumn = (
        title,
        status,
        color
    ) => (

        <Droppable droppableId={status}>

            {(provided) => (

                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-[#020617] rounded-3xl p-4 border border-white/5 min-h-[500px]"
                >

                    <h2 className={`text-xl font-bold mb-6 ${color}`}>
                        {title}
                    </h2>

                    <div className="space-y-4">

                        {tasks
                            .filter(
                                (task) =>
                                    task.status
                                        ?.toLowerCase()
                                        .trim() ===
                                    status
                                        .toLowerCase()
                                        .trim()
                            )
                            .map((task, index) => (

                                <Draggable
                                    key={task._id}
                                    draggableId={task._id}
                                    index={index}
                                >

                                    {(provided) => (

                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition"
                                        >

                                            <h3 className="font-semibold text-lg">
                                                {task.title}
                                            </h3>

                                            <p className="text-gray-400 text-sm mt-2">
                                                Priority: {task.priority}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                Assigned To: {
                                                    task.assignedTo?.name ||
                                                    "Unassigned"
                                                }
                                            </p>

                                            <p className="text-gray-400 text-sm">
                                                Due: {
                                                    task.dueDate
                                                        ? new Date(task.dueDate).toLocaleDateString()
                                                        : "No Due Date"
                                                }
                                            </p>

                                            {/* Buttons */}
                                            <div className="flex gap-2 mt-4">

                                                {status !== "Completed" && (

                                                    <button
                                                        onClick={() =>
                                                            handleMoveTask(
                                                                task._id,
                                                                task.status
                                                            )
                                                        }
                                                        className="flex-1 bg-purple-500/20 text-purple-400 py-2 rounded-xl hover:bg-purple-500/30 transition"
                                                    >
                                                        Move
                                                    </button>

                                                )}
                                                <button
                                                    onClick={() => {
                                                        setSelectedTask(task);
                                                        setEditModal(true);
                                                    }}
                                                    className="flex-1 bg-blue-500/20 text-blue-400 py-2 rounded-xl"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDeleteTask(task._id)
                                                    }
                                                    className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-xl hover:bg-red-500/30 transition"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>

                                    )}

                                </Draggable>

                            ))}

                        {provided.placeholder}

                    </div>

                </div>

            )}

        </Droppable>

    );
    const fetchUsers = async () => {

        try {

            const res = await getUsers();

            setUsers(res.data.users);

        } catch (error) {

            console.log(error);

        }

    };
    console.log(tasks);

    return (

        <MainLayout>

            {/* Header */}
            <div className="mb-8">

                <h1 className="text-4xl font-bold">
                    Project Details 🚀
                </h1>

                <p className="text-gray-400 mt-2">
                    Project ID: {id}
                </p>

            </div>

            {/* Project Info */}
            <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 mb-8">

                <h2 className="text-3xl font-semibold mb-4">
                    Task Management Project
                </h2>

                <p className="text-gray-400 mb-6">
                    Manage tasks and track progress efficiently
                </p>

                {/* Progress */}
                <div className="mb-4 flex justify-between text-sm">

                    <span className="text-gray-400">
                        Total Tasks
                    </span>

                    <span className="font-semibold">
                        {tasks.length}
                    </span>

                </div>

                <div className="w-full h-3 bg-[#020617] rounded-full overflow-hidden">

                    <div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
                        style={{
                            width: `${tasks.length * 10}%`,
                        }}
                    ></div>

                </div>

            </div>

            {/* Tasks Board */}
            <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6">

                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-2xl font-semibold">
                        Tasks Board
                    </h2>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
                    >
                        + Add Task
                    </button>

                </div>

                {/* ================= DRAG BOARD ================= */}

                <DragDropContext onDragEnd={handleDragEnd}>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {renderColumn(
                            "Todo",
                            "Todo",
                            "text-blue-400"
                        )}

                        {renderColumn(
                            "In Progress",
                            "In Progress",
                            "text-yellow-400"
                        )}

                        {renderColumn(
                            "Completed",
                            "Completed",
                            "text-green-400"
                        )}

                    </div>

                </DragDropContext>

            </div>

            {/* ================= MODAL ================= */}
            {showModal && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

                    <div className="bg-[#0f172a] p-8 rounded-3xl w-full max-w-lg border border-white/10">

                        <h2 className="text-3xl font-bold mb-6">
                            Create Task 🚀
                        </h2>

                        {/* Title */}
                        <input
                            type="text"
                            name="title"
                            placeholder="Task Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full mb-4 bg-[#020617] p-4 rounded-xl outline-none border border-white/10"
                        />

                        {/* Status */}
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full mb-4 bg-[#020617] p-4 rounded-xl outline-none border border-white/10"
                        >
                            <option>Todo</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>

                        {/* Priority */}
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full mb-4 bg-[#020617] p-4 rounded-xl outline-none border border-white/10"
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        <select
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            className="w-full mb-4 bg-[#020617] p-4 rounded-xl outline-none border border-white/10"
                        >

                            <option value="">
                                Assign Member
                            </option>

                            {users.map((user) => (

                                <option
                                    key={user._id}
                                    value={user._id}
                                >
                                    {user.name}
                                </option>

                            ))}

                        </select>

                        {/* Due Date */}
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full mb-6 bg-[#020617] p-4 rounded-xl outline-none border border-white/10"
                        />

                        {/* Buttons */}
                        <div className="flex gap-4">

                            <button
                                onClick={handleCreateTask}
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 p-4 rounded-xl font-semibold hover:scale-[1.02] transition"
                            >
                                {
                                    loading
                                        ? "Creating..."
                                        : "Create Task"
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
            {editModal && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

                    <div className="bg-[#0f172a] p-8 rounded-3xl w-full max-w-md">

                        <h2 className="text-2xl font-bold mb-6">
                            Edit Task
                        </h2>

                        <input
                            type="text"
                            value={selectedTask.title}
                            onChange={(e) =>
                                setSelectedTask({
                                    ...selectedTask,
                                    title: e.target.value,
                                })
                            }
                            className="w-full mb-4 bg-[#020617] p-4 rounded-xl"
                        />

                        <button
                            onClick={async () => {

                                await updateTask(
                                    selectedTask._id,
                                    selectedTask
                                );

                                fetchTasks();

                                setEditModal(false);

                            }}
                            className="w-full bg-blue-500 p-4 rounded-xl"
                        >
                            Save Changes
                        </button>

                    </div>

                </div>

            )}

        </MainLayout>

    );

}

export default ProjectDetails;