import React, { useState, useContext } from "react";
import { UserDataContext } from "../../context/userContext.jsx";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,
        { email, password }
      );
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        console.log("Login successful:", data.user,data.token);
        navigate("/");
      } else {
        console.error("Login failed");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Image */}
      <div className="w-1/2 bg-blue-100 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Login"
          className="object-cover h-3/4 rounded-xl shadow-lg"
        />
      </div>
      {/* Right: Form */}
      <div className="w-1/2 flex items-center justify-center flex-col bg-white gap-4">
        <form
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Login
          </button>
        </form>
        <div className="w-full max-w-md text-center mt-4">
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register-user" className="text-blue-600 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;