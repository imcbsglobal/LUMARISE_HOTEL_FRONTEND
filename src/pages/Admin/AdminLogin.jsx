import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/lumarise_logo.png"; // ✅ adjust path if needed

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://lumarisehotel.com/api/login/", {
        username,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username); // ✅ add this line
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-[900px] rounded-2xl shadow-2xl overflow-hidden bg-white">
        
        {/* 🔹 Left section: Logo */}
        <div className="flex items-center justify-center w-full md:w-1/2 p-8"
          style={{ backgroundColor: "#9fcae8ff" }}>  {/* replace this hex anytime */}
          <div className="flex flex-col items-center text-center">
            <img
              src={logo}
              alt="Lumarise Logo"
              className="w-40 mb-4 drop-shadow-lg"
            />
            <h2 className="text-xl font-bold text-gray-800">LUMARISE RESIDENCY</h2>
            <p className="text-sm text-gray-700 mt-2">Administration Panel</p>
          </div>
        </div>

        {/* 🔹 Right section: Login form */}
        <div className="w-full md:w-1/2 p-10 bg-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Admin Login
          </h2>

          {error && (
            <p className="text-red-500 text-center text-sm mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 bg-gray-50 rounded-full px-4 py-3 focus:ring-2 focus:ring-[#f5d36c] outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 bg-gray-50 rounded-full px-4 py-3 focus:ring-2 focus:ring-[#f5d36c] outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#9fcae8ff] text-black font-semibold py-3 rounded-full hover:bg-black hover:text-[#f5d36c] transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
