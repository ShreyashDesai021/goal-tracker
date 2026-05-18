import { useState }
from "react";

import { useNavigate }
from "react-router-dom";

import api
from "../api/axios";

import {
  useAuthStore,
} from "../store/authStore";

function LoginPage() {

  const navigate =
    useNavigate();

  const login =
    useAuthStore(
      state =>
      state.login
    );

  const [
    email,
    setEmail
  ] = useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const [
    loading,
    setLoading
  ] = useState(false);

  const handleLogin =
    async (
      e:
      React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(
          true
        );

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

        navigate(
          "/dashboard"
        );

      } catch (
        error: any
      ) {

        alert(
          error.response
          ?.data
          ?.message
          || "Login failed"
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={
          handleLogin
        }
        className="bg-white p-8 rounded-2xl shadow-md w-[400px]"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Goal Tracker
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4"
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
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          disabled={
            loading
          }
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
        >
          {
            loading
            ? "Logging in..."
            : "Login"
          }
        </button>

      </form>
    </div>
  );
}

export default LoginPage;