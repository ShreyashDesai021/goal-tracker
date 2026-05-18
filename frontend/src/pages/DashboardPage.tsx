import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuthStore,
} from "../store/authStore";

import {
  getEmployeeDashboard,
  getManagerDashboard,
  getAdminDashboard,
} from "../api/dashboardApi";

import {
  exportGoals,
} from "../api/exportApi";

import toast
from "react-hot-toast";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function DashboardPage() {

  const navigate =
    useNavigate();

  const user =
    useAuthStore(
      (state) =>
        state.user
    );

  const [
    dashboard,
    setDashboard,
  ] = useState<any>(
    null
  );

  useEffect(() => {

    const loadDashboard =
      async () => {

        try {

          let data;

          if (
            user?.role ===
            "EMPLOYEE"
          ) {

            data =
              await getEmployeeDashboard();
          }

          else if (
            user?.role ===
            "MANAGER"
          ) {

            data =
              await getManagerDashboard();
          }

          else if (
            user?.role ===
            "ADMIN"
          ) {

            data =
              await getAdminDashboard();
          }

          setDashboard(
            data
          );

        } catch (
          error
        ) {

          console.error(
            error
          );

          toast.error(
            "Failed to load dashboard"
          );
        }
      };

    loadDashboard();

  }, [user]);

  const handleExport =
    async () => {

      try {

        const data =
          await exportGoals();

        const url =
          window.URL
            .createObjectURL(
              new Blob([
                data,
              ])
            );

        const link =
          document
            .createElement(
              "a"
            );

        link.href =
          url;

        link.setAttribute(
          "download",
          "goal-report.csv"
        );

        document.body
          .appendChild(
            link
          );

        link.click();

        link.remove();

        toast.success(
          "Report exported!"
        );

      } catch (
        error
      ) {

        console.error(
          error
        );

        toast.error(
          "Export failed"
        );
      }
    };

  if (
    !dashboard
  ) {

    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-gray-500">
        Loading Dashboard...
      </div>
    );
  }

  const chartData =
    Object.entries(
      dashboard
    ).map(
      ([
        key,
        value,
      ]) => ({
        name:
          key
            .replace(
              /([A-Z])/g,
              " $1"
            )
            .replace(
              /^./,
              (
                str
              ) =>
                str.toUpperCase()
            ),

        value:
          Number(
            value
          ),
      })
    );

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">

        <div>

          <h1 className="text-5xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Welcome{" "}

            <span className="font-bold text-blue-600">
              {user?.name}
            </span>
          </p>

          <p className="text-gray-500 text-lg">
            Role: {user?.role}
          </p>

        </div>

        <div className="flex gap-4 flex-wrap">

          {/* EMPLOYEE */}

          {user?.role ===
            "EMPLOYEE" && (
            <>
              <button
                onClick={() =>
                  navigate(
                    "/create-goals"
                  )
                }
                className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Create Goals
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/my-goals"
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                My Goals
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/checkins"
                  )
                }
                className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Check-ins
              </button>
            </>
          )}

          {/* MANAGER */}

          {user?.role ===
            "MANAGER" && (
            <>

              <button
                onClick={() =>
                  navigate(
                    "/manager-review"
                  )
                }
                className="bg-yellow-600 hover:bg-yellow-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Review Goals
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/manager-checkins"
                  )
                }
                className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Team Check-ins
              </button>

              <button
                onClick={
                  handleExport
                }
                className="bg-emerald-600 hover:bg-emerald-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Export Report
              </button>

            </>
          )}

          {/* ADMIN */}

          {user?.role ===
            "ADMIN" && (
            <>
              <button
                onClick={() =>
                  navigate(
                    "/admin"
                  )
                }
                className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Admin Panel
              </button>

              <button
                onClick={
                  handleExport
                }
                className="bg-emerald-600 hover:bg-emerald-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              >
                Export Report
              </button>
            </>
          )}

        </div>

      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {chartData.map(
          (
            item
          ) => (

            <div
              key={
                item.name
              }
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >

              <h3 className="text-gray-500 text-lg">
                {
                  item.name
                }
              </h3>

              <p className="text-5xl font-bold mt-4 text-slate-800">
                {
                  item.value
                }
              </p>

            </div>
          )
        )}

      </div>

      {/* Charts */}

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl p-6 shadow-md">

          <h2 className="text-2xl font-bold mb-6">
            Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart
              data={
                chartData
              }
            >

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">

          <h2 className="text-2xl font-bold mb-6">
            Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={
                  chartData
                }
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {chartData.map(
                  (
                    _,
                    index
                  ) => (

                    <Cell
                      key={
                        index
                      }
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;