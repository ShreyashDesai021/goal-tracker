import {
  useEffect,
  useState,
} from "react";

import toast
from "react-hot-toast";

import {
  getPendingGoals,
  approveGoalSheet,
  reworkGoalSheet,
} from "../api/managerApi";

function ManagerReviewPage() {

  const [
    goalSheets,
    setGoalSheets,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const loadGoals =
    async () => {

      try {

        setLoading(
          true
        );

        const res =
          await getPendingGoals();

        setGoalSheets(
          res
        );

      } catch (
        error
      ) {

        console.error(
          error
        );

        toast.error(
          "Failed to load goals"
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleApprove =
    async (
      id: string
    ) => {

      try {

        await approveGoalSheet(
          id
        );

        toast.success(
          "Goals Approved!"
        );

        loadGoals();

      } catch (
        error: any
      ) {

        toast.error(
          error.response
            ?.data
            ?.message ||
          "Action failed"
        );
      }
    };

  const handleRework =
    async (
      id: string
    ) => {

      try {

        await reworkGoalSheet(
          id
        );

        toast.success(
          "Sent for Rework!"
        );

        loadGoals();

      } catch (
        error: any
      ) {

        toast.error(
          error.response
            ?.data
            ?.message ||
          "Action failed"
        );
      }
    };

  const getStatusBadge =
    (
      status: string
    ) => {

      switch (
        status
      ) {

        case
          "SUBMITTED":

          return (
            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
              SUBMITTED
            </span>
          );

        case
          "REWORK":

          return (
            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
              REWORK
            </span>
          );

        case
          "APPROVED":

          return (
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              APPROVED
            </span>
          );

        default:

          return (
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
              DRAFT
            </span>
          );
      }
    };

  if (
    loading
  ) {

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-2xl font-semibold text-gray-500">
        Loading pending goals...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Pending Goals
      </h1>

      {goalSheets.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500 text-lg">
          No pending goals
        </div>

      ) : (

        <div className="space-y-8">

          {goalSheets.map(
            (sheet) => (

              <div
                key={sheet.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
              >

                <div className="flex justify-between items-start mb-6">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {
                        sheet.employee
                          .name
                      }
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {
                        sheet.employee
                          .email
                      }
                    </p>

                  </div>

                  {getStatusBadge(
                    sheet.status
                  )}

                </div>

                <div className="space-y-4 mb-8">

                  {sheet.goals.map(
                    (
                      goal: any
                    ) => (

                      <div
                        key={goal.id}
                        className="border rounded-2xl p-5 hover:bg-slate-50 transition"
                      >

                        <div className="flex justify-between items-start">

                          <div>

                            <h3 className="font-bold text-lg">
                              {
                                goal.title
                              }
                            </h3>

                            <p className="text-gray-500 mt-1">
                              {
                                goal.description
                              }
                            </p>

                          </div>

                          {goal.isShared && (

                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                              Shared Goal
                            </span>
                          )}

                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mt-5 text-sm">

                          <div>
                            <strong>
                              Weight:
                            </strong>{" "}
                            {
                              goal.weightage
                            }%
                          </div>

                          <div>
                            <strong>
                              Target:
                            </strong>{" "}
                            {
                              goal.target
                            }
                          </div>

                          <div>
                            <strong>
                              Thrust:
                            </strong>{" "}
                            {
                              goal.thrustArea
                            }
                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>

                <div className="flex gap-4">

                  <button
                    onClick={() =>
                      handleApprove(
                        sheet.id
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleRework(
                        sheet.id
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
                  >
                    Rework
                  </button>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default ManagerReviewPage;