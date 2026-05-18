import {
  Routes,
  Route,
} from "react-router-dom";

import LoginPage
from "../pages/LoginPage";

import DashboardPage
from "../pages/DashboardPage";

import MyGoalsPage
from "../pages/MyGoalsPage";

import CreateGoalsPage
from "../pages/CreateGoalsPage";

import ManagerReviewPage
from "../pages/ManagerReviewPage";

import ManagerCheckinsPage
from "../pages/ManagerCheckinsPage";

import CheckinsPage
from "../pages/CheckinsPage";

import AdminPage
from "../pages/AdminPage";

import ProtectedRoute
from "./ProtectedRoute";

function AppRouter() {

  return (
    <Routes>

      {/* Login */}
      <Route
        path="/"
        element={
          <LoginPage />
        }
      />

      <Route
        path="/login"
        element={
          <LoginPage />
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Employee Routes */}
      <Route
        path="/my-goals"
        element={
          <ProtectedRoute
            allowedRoles={[
              "EMPLOYEE",
            ]}
          >
            <MyGoalsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-goals"
        element={
          <ProtectedRoute
            allowedRoles={[
              "EMPLOYEE",
            ]}
          >
            <CreateGoalsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkins"
        element={
          <ProtectedRoute
            allowedRoles={[
              "EMPLOYEE",
            ]}
          >
            <CheckinsPage />
          </ProtectedRoute>
        }
      />

      {/* Manager Routes */}
      <Route
        path="/manager-review"
        element={
          <ProtectedRoute
            allowedRoles={[
              "MANAGER",
            ]}
          >
            <ManagerReviewPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager-checkins"
        element={
          <ProtectedRoute
            allowedRoles={[
              "MANAGER",
            ]}
          >
            <ManagerCheckinsPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
            ]}
          >
            <AdminPage />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRouter;