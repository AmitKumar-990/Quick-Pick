// components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-100 pr-24 px-8 py-3 flex justify-between items-center shadow-sm">
      
      {/* Logo Section */}
      <div className="flex pl-20 items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-md">
          QP
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Quick <span className="text-blue-500">Pick</span>
        </h1>
      </div>

      {/* Right Section */}
      <button
        onClick={() => {
          Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, logout",
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("token");
              Swal.fire({
                title: "Logged out!",
                text: "You have been successfully logged out.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });

              navigate("/", { replace: true });
            }
          });
        }}
        className="flex items-center gap-2 bg-gray-100 hover:bg-red-500 text-gray-700 hover:text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Logout
      </button>
    </div>
  );
}