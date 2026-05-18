import {
  useEffect,
  useState,
} from "react";

import toast
from "react-hot-toast";

import {
  createSharedGoal,
  getAuditLogs,
} from "../api/adminApi";

function AdminPage() {

  const [
    logs,
    setLogs
  ] = useState<any[]>(
    []
  );

  const [
    loading,
    setLoading
  ] = useState(
    false
  );

  const [
    pageLoading,
    setPageLoading
  ] = useState(
    true
  );

  const [
    formData,
    setFormData
  ] = useState({
    thrustArea: "",
    title: "",
    description: "",
    uomType:
      "NUMERIC",
    target: 0,
    weightage:
      10,
  });

  const loadLogs =
    async () => {

      try {

        setPageLoading(
          true
        );

        const res =
          await getAuditLogs();

        setLogs(
          res
        );

      } catch (
        error
      ) {

        console.error(
          error
        );

        toast.error(
          "Failed to load audit logs"
        );

      } finally {

        setPageLoading(
          false
        );
      }
    };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleSubmit =
    async () => {

      try {

        setLoading(
          true
        );

        await createSharedGoal(
          formData
        );

        toast.success(
          "Shared Goal Created!"
        );

        setFormData({
          thrustArea:
            "",
          title:
            "",
          description:
            "",
          uomType:
            "NUMERIC",
          target:
            0,
          weightage:
            10,
        });

        loadLogs();

      } catch (
        error: any
      ) {

        toast.error(
          error.response
            ?.data
            ?.message ||
          "Failed to create shared goal"
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  if (
    pageLoading
  ) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-2xl font-semibold text-gray-500">
        Loading admin panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Admin Panel
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Shared Goal Form */}

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">

          <h2 className="text-2xl font-bold mb-2">
            Create Shared Goal
          </h2>

          <p className="text-gray-500 mb-6">
            Add organization-wide goals
            for employees.
          </p>

          <div className="space-y-4">

            <input
              placeholder="Thrust Area"
              value={
                formData
                .thrustArea
              }
              onChange={
                (e) =>
                  setFormData({
                    ...formData,
                    thrustArea:
                      e.target
                      .value,
                  })
              }
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              placeholder="Title"
              value={
                formData
                .title
              }
              onChange={
                (e) =>
                  setFormData({
                    ...formData,
                    title:
                      e.target
                      .value,
                  })
              }
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              placeholder="Description"
              value={
                formData
                .description
              }
              onChange={
                (e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target
                      .value,
                  })
              }
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                placeholder="Target"
                value={
                  formData
                  .target
                }
                onChange={
                  (e) =>
                    setFormData({
                      ...formData,
                      target:
                        Number(
                          e.target
                            .value
                        ),
                    })
                }
                className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="number"
                placeholder="Weightage"
                value={
                  formData
                  .weightage
                }
                onChange={
                  (e) =>
                    setFormData({
                      ...formData,
                      weightage:
                        Number(
                          e.target
                            .value
                        ),
                    })
                }
                className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <select
              value={
                formData
                .uomType
              }
              onChange={
                (e) =>
                  setFormData({
                    ...formData,
                    uomType:
                      e.target
                        .value,
                  })
              }
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>
                NUMERIC
              </option>

              <option>
                PERCENTAGE
              </option>

              <option>
                TIMELINE
              </option>

              <option>
                ZERO_BASED
              </option>
            </select>

            <button
              onClick={
                handleSubmit
              }
              disabled={
                loading
              }
              className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-xl w-full font-semibold shadow-sm disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create Shared Goal"}
            </button>

          </div>

        </div>

        {/* Audit Logs */}

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">

          <div className="flex justify-between items-center mb-5">

            <div>

              <h2 className="text-2xl font-bold">
                Audit Logs
              </h2>

              <p className="text-gray-500">
                System activity history
              </p>

            </div>

            <span className="bg-slate-200 px-4 py-2 rounded-full text-sm font-semibold">
              {logs.length}
              {" "}
              Logs
            </span>

          </div>

          <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2">

            {logs.length === 0 ? (

              <div className="text-center text-gray-500 py-10">
                No audit logs found
              </div>

            ) : (

              logs.map(
                (
                  log
                ) => (

                  <div
                    key={
                      log.id
                    }
                    className="border rounded-2xl p-4 hover:bg-slate-50 transition"
                  >

                    <div className="flex justify-between items-start">

                      <div>

                        <h3 className="font-bold text-lg">
                          {
                            log.action
                          }
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          User:
                          {" "}
                          {
                            log.user
                              ?.name
                          }
                        </p>

                        <p className="text-sm text-gray-500">
                          Entity:
                          {" "}
                          {
                            log.entity
                          }
                        </p>

                      </div>

                      <span className="text-xs text-gray-400">
                        {new Date(
                          log.createdAt
                        )
                        .toLocaleString()}
                      </span>

                    </div>

                  </div>
                )
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminPage;