import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuthStore,
} from "../store/authStore";

function Navbar() {

  const navigate =
    useNavigate();

  const user =
    useAuthStore(
      (state) =>
        state.user
    );

  const logout =
    useAuthStore(
      (state) =>
        state.logout
    );

  const handleLogout =
    () => {

      logout();

      navigate(
        "/login"
      );
    };

  return (
    <nav className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">

      <div className="flex items-center gap-6">

        <Link
          to="/dashboard"
          className="text-2xl font-bold text-indigo-600"
        >
          Goal Tracker
        </Link>

        {user?.role ===
          "EMPLOYEE" && (
          <>
            <Link
              to="/create-goals"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Create Goals
            </Link>

            <Link
              to="/my-goals"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              My Goals
            </Link>

            <Link
              to="/checkins"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Check-ins
            </Link>
          </>
        )}

        {user?.role ===
          "MANAGER" && (
          <Link
            to="/manager-review"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Manager Review
          </Link>
        )}

        {user?.role ===
          "ADMIN" && (
          <Link
            to="/admin"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Admin Panel
          </Link>
        )}

      </div>

      <div className="flex items-center gap-4">

        <span className="bg-slate-200 px-4 py-2 rounded-full text-sm font-semibold">
          {user?.role}
        </span>

        <button
          onClick={
            handleLogout
          }
          className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-xl font-semibold"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;