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
      navigate("/"); // go to login

    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 text-white items-center justify-center">
        <div className="text-center px-10">
          <h1 className="text-6xl font-bold mb-4">Join Us</h1>
          <p className="text-2xl opacity-90">
            Start creating polls in seconds.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-[380px] md:w-[420px]">

          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 mb-6">
            Register to get started
          </p>

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
            onClick={handleRegister}
            className="w-full bg-blue-500 text-white p-3 rounded-xl"
          >
            Register
          </button>

          <p className="mt-5 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
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