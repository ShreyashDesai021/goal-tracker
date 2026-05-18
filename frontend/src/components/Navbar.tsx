import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  LayoutDashboard,
  ClipboardList,
  CheckCircle2,
  Shield,
  Users,
  LogOut,
  Target,
} from "lucide-react";

import {
  useAuthStore,
} from "../store/authStore";

function Navbar() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

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

  const isActive = (
    path: string
  ) =>
    location.pathname ===
    path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">

      <div className="px-8 py-4 flex justify-between items-center">

        {/* LEFT */}

        <div className="flex items-center gap-8">

          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="bg-indigo-600 p-2 rounded-xl shadow-md">
              <Target
                size={20}
                className="text-white"
              />
            </div>

            <span className="text-2xl font-bold text-slate-900">
              Goal Tracker
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">

            {/* EMPLOYEE */}

            {user?.role ===
              "EMPLOYEE" && (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                    isActive(
                      "/dashboard"
                    )
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <Link
                  to="/create-goals"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                    isActive(
                      "/create-goals"
                    )
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <ClipboardList size={18} />
                  Create Goals
                </Link>

                <Link
                  to="/my-goals"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                    isActive(
                      "/my-goals"
                    )
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Target size={18} />
                  My Goals
                </Link>

                <Link
                  to="/checkins"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                    isActive(
                      "/checkins"
                    )
                      ? "bg-purple-100 text-purple-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <CheckCircle2 size={18} />
                  Check-ins
                </Link>
              </>
            )}

            {/* MANAGER */}

            {user?.role ===
              "MANAGER" && (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                    isActive(
                      "/dashboard"
                    )
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <Link
                  to="/manager-review"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                    isActive(
                      "/manager-review"
                    )
                      ? "bg-amber-100 text-amber-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Users size={18} />
                  Review Goals
                </Link>

                <Link
                  to="/manager-checkins"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                    isActive(
                      "/manager-checkins"
                    )
                      ? "bg-violet-100 text-violet-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <CheckCircle2 size={18} />
                  Team Check-ins
                </Link>
              </>
            )}

            {/* ADMIN */}

            {user?.role ===
              "ADMIN" && (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                    isActive(
                      "/dashboard"
                    )
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <Link
                  to="/admin"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                    isActive(
                      "/admin"
                    )
                      ? "bg-red-100 text-red-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Shield size={18} />
                  Admin Panel
                </Link>
              </>
            )}

          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          <div className="hidden md:flex flex-col text-right">
            <span className="font-semibold text-slate-800">
              {user?.name}
            </span>

            <span className="text-sm text-slate-500">
              {user?.email}
            </span>
          </div>

          <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold">
            {user?.role}
          </span>

          <button
            onClick={
              handleLogout
            }
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-2xl font-semibold shadow-md"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;