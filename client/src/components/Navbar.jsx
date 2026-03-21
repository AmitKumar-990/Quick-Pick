// components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md pl-32 px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-500">
        Quick Decision
      </h1>

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
        className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}