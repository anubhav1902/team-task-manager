import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/authApi";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Handle Login
  const handleLogin = async () => {

    try {

      setLoading(true);

      const response = await loginUser(formData);

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex bg-[#020617]">

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-b from-purple-700 to-indigo-900 items-center justify-center p-10">

        <div className="max-w-lg">

          <h1 className="text-6xl font-bold leading-tight mb-6 text-white">
            Organize. Collaborate. Deliver.
          </h1>

          <p className="text-gray-200 text-xl">
            Manage projects and tasks efficiently with your team.
          </p>

        </div>

      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center px-6">

        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">

          <h2 className="text-4xl font-bold mb-2 text-white">
            Welcome Back 👋
          </h2>

          <p className="text-gray-400 mb-8">
            Login to continue
          </p>

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
            className="w-full mb-3 bg-[#0f172a] text-white p-4 rounded-xl outline-none border border-gray-700 focus:border-purple-500 transition"
          />

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">

            <button className="text-sm text-purple-400 hover:text-purple-300">
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-[1.02] transition-all duration-300 p-4 rounded-xl font-semibold text-white shadow-lg"
          >
            {
              loading
                ? "Logging in..."
                : "Login"
            }
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">

            <div className="flex-1 h-[1px] bg-white/10"></div>

            <span className="text-gray-500 text-sm">
              OR
            </span>

            <div className="flex-1 h-[1px] bg-white/10"></div>

          </div>

          {/* Signup */}
          <p className="text-center text-gray-400">

            Don’t have an account?{" "}

            <button
              onClick={() => navigate("/signup")}
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Signup
            </button>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;