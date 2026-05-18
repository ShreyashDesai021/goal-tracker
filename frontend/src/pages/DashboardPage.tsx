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

import StatCard
from "../components/StatCard";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Users,
  Shield,
  ClipboardCheck,
  Activity,
  TrendingUp,
  FileBarChart,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

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

      // No data case

      if (
        data?.type ===
        "application/json"
      ) {

        const text =
          await data.text();

        const parsed =
          JSON.parse(
            text
          );

        toast(
          parsed.message ||
          "No report available"
        );

        return;
      }

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
      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <div className="bg-white rounded-[32px] shadow-xl px-10 py-8">

          <p className="text-2xl font-bold text-slate-700">
            Loading Dashboard...
          </p>

        </div>

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
              (str) =>
                str.toUpperCase()
            ),

        value:
          Number(
            value
          ),
      })
    );


  const roleTheme =
  user?.role ===
  "EMPLOYEE"
    ? {
        accent:
          "emerald",
        hero:
          "from-emerald-700 via-emerald-600 to-green-500",
      }
    : user?.role ===
      "MANAGER"
    ? {
        accent:
          "indigo",
        hero:
          "from-indigo-700 via-indigo-600 to-blue-600",
      }
    : {
        accent:
          "violet",
        hero:
          "from-violet-700 via-purple-600 to-indigo-600",
      };

const hasChartData =
  chartData.some(
    (
      item
    ) =>
      item.value > 0
  );

  const getHealth =
    () => {

      if (
        user?.role ===
        "EMPLOYEE"
      ) {

        if (
          dashboard.approved >
          dashboard.rework
        ) {

          return {
            status:
              "Healthy",
            color:
              "text-emerald-600",
            bg:
              "bg-emerald-50",
            icon:
              CheckCircle2,
            message:
              "Most goals are progressing well",
          };
        }

        return {
          status:
            "Needs Attention",
          color:
            "text-amber-600",
          bg:
            "bg-amber-50",
          icon:
            AlertTriangle,
          message:
            "Some goals may need revision",
        };
      }

      if (
        user?.role ===
        "MANAGER"
      ) {

        if (
          dashboard.pendingApprovals <=
          2
        ) {

          return {
            status:
              "Team Healthy",
            color:
              "text-emerald-600",
            bg:
              "bg-emerald-50",
            icon:
              CheckCircle2,
            message:
              "Approval flow is under control",
          };
        }

        return {
          status:
            "Needs Review",
          color:
            "text-amber-600",
          bg:
            "bg-amber-50",
          icon:
            AlertTriangle,
          message:
            "Pending approvals are increasing",
        };
      }

      return {
        status:
          "Organization Stable",
        color:
          "text-indigo-600",
        bg:
          "bg-indigo-50",
        icon:
          Shield,
        message:
          "System metrics look healthy",
      };
    };

  const health =
    getHealth();

  const recentActivity =
    [
      "Quarterly tracking active",
      "Goal performance analytics updated",
      "Dashboard insights generated",
      "Employee productivity monitored",
    ];
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* HERO */}

      <div className={`bg-gradient-to-r ${roleTheme.hero} rounded-[36px] p-10 text-white shadow-2xl mb-8`}>

        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <p className="text-indigo-100 font-medium mb-3">
              PERFORMANCE PORTAL
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Welcome back,
              <br />
              {user?.name}
            </h1>

            <p className="mt-5 text-indigo-100 text-lg">
              Monitor goals,
              performance and
              organizational
              productivity in one
              place.
            </p>

          </div>

          <div className="flex gap-4 flex-wrap items-start">

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
                  className="bg-white text-slate-900 px-6 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
                >
                  Create Goals
                </button>

                <button
                  onClick={() =>
                    navigate(
                      "/my-goals"
                    )
                  }
                  className="bg-white/20 backdrop-blur-lg px-6 py-4 rounded-2xl font-semibold border border-white/20"
                >
                  My Goals
                </button>

                <button
                  onClick={() =>
                    navigate(
                      "/checkins"
                    )
                  }
                  className="bg-purple-500 hover:bg-purple-600 transition px-6 py-4 rounded-2xl font-semibold shadow-lg text-white"
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
                  className="bg-white text-slate-900 px-6 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
                >
                  Review Goals
                </button>

                <button
                  onClick={() =>
                    navigate(
                      "/manager-checkins"
                    )
                  }
                  className="bg-indigo-500 hover:bg-indigo-600 transition px-6 py-4 rounded-2xl font-semibold shadow-lg text-white"
                >
                  Team Check-ins
                </button>

                <button
                  onClick={
                    handleExport
                  }
                  className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-4 rounded-2xl font-semibold shadow-lg text-white"
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
                  className="bg-white text-slate-900 px-6 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
                >
                  Admin Panel
                </button>

                <button
                  onClick={
                    handleExport
                  }
                  className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-4 rounded-2xl font-semibold shadow-lg text-white"
                >
                  Export Report
                </button>
              </>
            )}

          </div>

        </div>
      </div>

      {/* KPI CARDS */}

<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

  {chartData.map(
    (
      item,
      index
    ) => {

      const icons = [
        Users,
        ClipboardCheck,
        TrendingUp,
        Activity,
      ];

      const Icon =
        icons[
          index %
          icons.length
        ];

      return (
        <StatCard
          key={
            item.name
          }
          title={
            item.name
          }
          value={
            item.value
          }
          roleColor={
            roleTheme.accent
          }
          icon={
            <Icon
              className={`text-${roleTheme.accent}-600`}
            />
          }
        />
      );
    }
  )}
</div>

      {/* HEALTH + ACTIVITY */}

      <div className="grid lg:grid-cols-3 gap-8 mb-8">

        <div
          className={`${health.bg} rounded-[32px] p-8 shadow-md col-span-1`}
        >

          <health.icon
            className={`${health.color} mb-5`}
            size={42}
          />

          <h2
            className={`text-3xl font-bold ${health.color}`}
          >
            {health.status}
          </h2>

          <p className="text-slate-600 mt-3">
            {
              health.message
            }
          </p>

        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-md col-span-2">

          <div className="flex items-center gap-3 mb-6">

            <Activity className="text-indigo-600" />

            <h2 className="text-2xl font-bold text-slate-900">
              Recent Activity
            </h2>

          </div>

          <div className="space-y-4">

            {recentActivity.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b border-slate-100 pb-4"
                >

                  <div className="w-3 h-3 rounded-full bg-indigo-600" />

                  <p className="text-slate-700 font-medium">
                    {item}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-[32px] p-8 shadow-md">

          <div className="flex items-center gap-3 mb-6">

            <TrendingUp className="text-indigo-600" />

            <h2 className="text-2xl font-bold text-slate-900">
              Analytics
            </h2>

          </div>

{
  hasChartData ? (

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
          fill="#4f46e5"
          radius={[
            12,
            12,
            0,
            0,
          ]}
        />
      </BarChart>
    </ResponsiveContainer>

  ) : (

    <div className="h-[320px] flex flex-col items-center justify-center text-center">

      <TrendingUp
        size={48}
        className="text-slate-300 mb-4"
      />

      <h3 className="text-xl font-bold text-slate-700">
        No analytics yet
      </h3>

      <p className="text-slate-500 mt-2">
        Create goals to unlock
        performance insights
      </p>

    </div>
  )
}

        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-md">

          <div className="flex items-center gap-3 mb-6">

            <FileBarChart className="text-indigo-600" />

            <h2 className="text-2xl font-bold text-slate-900">
              Distribution
            </h2>

          </div>

{
  hasChartData ? (

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
          fill="#4f46e5"
          radius={[
            12,
            12,
            0,
            0,
          ]}
        />
      </BarChart>
    </ResponsiveContainer>

  ) : (

    <div className="h-[320px] flex flex-col items-center justify-center text-center">

      <TrendingUp
        size={48}
        className="text-slate-300 mb-4"
      />

      <h3 className="text-xl font-bold text-slate-700">
        No analytics yet
      </h3>

      <p className="text-slate-500 mt-2">
        Create goals to unlock
        performance insights
      </p>

    </div>
  )
}

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;