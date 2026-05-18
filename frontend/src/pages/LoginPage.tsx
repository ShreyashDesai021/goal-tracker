import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Users,
  User,
  Target,
  TrendingUp,
} from "lucide-react";

import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

function LoginPage() {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login
  );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const fillDemoUser = (
    role: string
  ) => {
    if (role === "ADMIN") {
      setEmail("admin@goal.com");
      setPassword("password123");
    }

    if (role === "MANAGER") {
      setEmail("manager@goal.com");
      setPassword("password123");
    }

    if (role === "EMPLOYEE") {
      setEmail("employee@goal.com");
      setPassword("password123");
    }
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      login(
        res.data.token,
        res.data.user
      );

      navigate("/dashboard");
    } catch (error: any) {
      alert(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-950 to-slate-900 p-14 flex-col justify-between">

        <div>

          <div className="flex items-center gap-3 mb-8">

            <div className="bg-indigo-600 p-3 rounded-2xl">
              <Target size={28} />
            </div>

            <h1 className="text-4xl font-bold">
              Goal Tracker
            </h1>

          </div>

          <div className="max-w-lg mt-16">

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Smart Goal
              Management for
              Teams &
              Organizations
            </h2>

            <p className="text-slate-300 text-lg leading-8">
              Track goals,
              monitor
              performance,
              manage teams,
              and improve
              productivity
              with a modern
              performance
              management
              system.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-5">

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-5">
            <TrendingUp
              className="text-emerald-400 mb-3"
            />
            <h3 className="font-semibold text-lg">
              Productivity
            </h3>
            <p className="text-slate-300 text-sm mt-2">
              Track employee
              growth &
              performance
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-5">
            <Users
              className="text-cyan-400 mb-3"
            />
            <h3 className="font-semibold text-lg">
              Team Tracking
            </h3>
            <p className="text-slate-300 text-sm mt-2">
              Monitor team
              goals &
              quarterly
              updates
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 bg-slate-100 flex items-center justify-center p-8">

        <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-10">

          <div className="text-center mb-8">

            <div className="w-20 h-20 rounded-3xl bg-indigo-100 flex items-center justify-center mx-auto mb-5">
              <Target
                className="text-indigo-600"
                size={36}
              />
            </div>

            <h1 className="text-4xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="text-slate-500 mt-2">
              Login to your
              account
            </p>
          </div>

          {/* DEMO LOGIN */}

          <div className="mb-7">

            <p className="text-sm font-semibold text-slate-500 mb-4">
              QUICK DEMO ACCESS
            </p>

            <div className="grid grid-cols-3 gap-3">

              <button
                onClick={() =>
                  fillDemoUser(
                    "ADMIN"
                  )
                }
                type="button"
                className="rounded-2xl border border-slate-200 p-4 hover:bg-indigo-50 transition"
              >
                <Shield
                  className="mx-auto text-indigo-600 mb-2"
                  size={20}
                />

                <p className="text-sm font-semibold text-slate-800">
                  Admin
                </p>
              </button>

              <button
                onClick={() =>
                  fillDemoUser(
                    "MANAGER"
                  )
                }
                type="button"
                className="rounded-2xl border border-slate-200 p-4 hover:bg-yellow-50 transition"
              >
                <Users
                  className="mx-auto text-amber-600 mb-2"
                  size={20}
                />

                <p className="text-sm font-semibold text-slate-800">
                  Manager
                </p>
              </button>

              <button
                onClick={() =>
                  fillDemoUser(
                    "EMPLOYEE"
                  )
                }
                type="button"
                className="rounded-2xl border border-slate-200 p-4 hover:bg-emerald-50 transition"
              >
                <User
                  className="mx-auto text-emerald-600 mb-2"
                  size={20}
                />

                <p className="text-sm font-semibold text-slate-800">
                  Employee
                </p>
              </button>

            </div>

          </div>

          <form
            onSubmit={
              handleLogin
            }
          >

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 p-4 rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 p-4 rounded-2xl mb-6 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white p-4 rounded-2xl font-bold text-lg shadow-lg"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default LoginPage;