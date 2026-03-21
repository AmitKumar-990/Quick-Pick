import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

if (token) {
  return <Navigate to="/Dashboard" replace />;
}

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });
      localStorage.setItem("token", res.data.token);

      navigate("/Dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
      console.log("LOGIN ERROR:", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white items-center justify-center">
        <div className="text-center px-10">
          <h1 className="text-6xl font-bold mb-4">Quick Pick</h1>
          <p className="text-2xl opacity-90">
            Create polls. Get opinions. Decide faster.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-[380px] md:w-[420px]">

          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mb-6">Login to continue</p>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 mb-3 text-sm">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email address"
            className="w-full border p-3 rounded-xl mb-4"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl mb-5"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-3 rounded-xl"
          >
            Login
          </button>

          <p className="mt-5 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}