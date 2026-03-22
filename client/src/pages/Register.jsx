// Register.jsx (UI + Enter key fix — logic unchanged)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        email,
        password
      });

      setError("");
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-blue-50">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">

        <div className="absolute w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl top-20 left-10"></div>
        <div className="absolute w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl bottom-10 right-10"></div>

        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Quick Pick
          </h1>

          <p className="text-lg text-gray-600 max-w-md">
            Create interactive polls, get instant feedback, and make decisions faster.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-4">

        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-gray-200 p-8 rounded-3xl shadow-xl">

          {/* TITLE */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Create account
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Join Quick Pick today
          </p>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-white border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}