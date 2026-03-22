import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
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
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-blue-50">

      {/* LEFT (BRAND + GLOW) */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">

        <div className="absolute w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl top-20 left-10"></div>
        <div className="absolute w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl bottom-10 right-10"></div>

        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome Back
          </h1>

          <p className="text-lg text-gray-600 max-w-md">
            Log in to continue creating polls and making decisions faster.
          </p>
        </div>
      </div>

      {/* RIGHT (FORM) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-4">

        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-gray-200 p-8 rounded-3xl shadow-xl">

          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Sign in to Quick Pick
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Enter your credentials to continue
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
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
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
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