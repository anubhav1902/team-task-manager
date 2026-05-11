import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signupUser } from "../../api/authApi";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Handle Signup
  const handleSignup = async () => {

    try {

      setLoading(true);

      const response = await signupUser(formData);

      alert(response.data.message);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex bg-[#020617] items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">

        <h2 className="text-4xl font-bold mb-2 text-white">
          Create Account 🚀
        </h2>

        <p className="text-gray-400 mb-8">
          Signup to continue
        </p>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 bg-[#0f172a] text-white p-4 rounded-xl outline-none border border-gray-700 focus:border-purple-500 transition"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 bg-[#0f172a] text-white p-4 rounded-xl outline-none border border-gray-700 focus:border-purple-500 transition"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 bg-[#0f172a] text-white p-4 rounded-xl outline-none border border-gray-700 focus:border-purple-500 transition"
        />

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-6 bg-[#0f172a] text-white p-4 rounded-xl outline-none border border-gray-700"
        >
          <option value="Admin">
            Admin
          </option>

          <option value="Member">
            Member
          </option>
        </select>

        {/* Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-[1.02] transition-all duration-300 p-4 rounded-xl font-semibold text-white shadow-lg"
        >
          {
            loading
              ? "Creating Account..."
              : "Create Account"
          }
        </button>

        {/* Login */}
        <p className="text-center text-gray-400 mt-8">

          Already have an account?{" "}

          <button
            onClick={() => navigate("/")}
            className="text-purple-400 hover:text-purple-300 font-semibold"
          >
            Login
          </button>

        </p>

      </div>

    </div>

  );
}

export default Signup;