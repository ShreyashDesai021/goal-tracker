import {
  useEffect,
  useState,
} from "react";

import toast
from "react-hot-toast";

import {
  getMyGoals,
  submitGoalSheet,
} from "../api/goalApi";

function MyGoalsPage() {

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
          await getMyGoals();

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

  const handleSubmitGoals =
    async (
      goalSheetId:
      string
    ) => {

      try {

        await submitGoalSheet(
          goalSheetId
        );

        toast.success(
          "Goals Submitted!"
        );

        await loadGoals();

      } catch (
        error: any
      ) {

        toast.error(
          error.response
            ?.data
            ?.message ||
          "Submission failed"
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
          "APPROVED":

          return (
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm mt-2 inline-block font-semibold">
              APPROVED
            </span>
          );

        case
          "REWORK":

          return (
            <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm mt-2 inline-block font-semibold">
              REWORK
            </span>
          );

        case
          "SUBMITTED":

          return (
            <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm mt-2 inline-block font-semibold">
              SUBMITTED
            </span>
          );

        default:

          return (
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm mt-2 inline-block font-semibold">
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
        Loading goals...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Goals
      </h1>

      {goalSheets.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500 text-lg">
          No goals found
        </div>

      ) : (

        <div className="space-y-8">

          {goalSheets.map(
            (sheet) => (

              <div
                key={sheet.id}
                className="bg-white rounded-2xl shadow-md p-6"
              >

                <div className="flex justify-between items-center mb-6">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Goal Sheet
                    </h2>

                    {getStatusBadge(
                      sheet.status
                    )}

                  </div>

                  {(sheet.status ===
                    "DRAFT" ||

                    sheet.status ===
                    "REWORK") && (

                    <button
                      onClick={() =>
                        handleSubmitGoals(
                          sheet.id
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-xl font-semibold"
                    >
                      Submit Goals
                    </button>
                  )}

                </div>

                <div className="space-y-4">

                  {sheet.goals.map(
                    (
                      goal: any
                    ) => (

                      <div
                        key={goal.id}
                        className="border rounded-2xl p-5 hover:shadow-md transition"
                      >

                        <div className="flex justify-between items-start">

                          <div>

                            <h3 className="text-lg font-bold">
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

                        <div className="grid md:grid-cols-4 gap-4 mt-5 text-sm">

                          <div>
                            <strong>
                              Thrust:
                            </strong>{" "}
                            {
                              goal.thrustArea
                            }
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
                              Weight:
                            </strong>{" "}
                            {
                              goal.weightage
                            }%
                          </div>

                          <div>
                            <strong>
                              Updates:
                            </strong>{" "}
                            {
                              goal
                                .quarterlyUpdates
                                ?.length ?? 0
                            }
                          </div>

                        </div>

                        {goal
                          .quarterlyUpdates
                          ?.length > 0 && (

                          <div className="mt-5 border-t pt-4">

                            <h4 className="font-semibold mb-3">
                              Quarterly Updates
                            </h4>

                            <div className="space-y-2">

                              {goal.quarterlyUpdates.map(
                                (
                                  update: any
                                ) => (

                                  <div
                                    key={
                                      update.id
                                    }
                                    className="bg-slate-100 rounded-xl p-3 text-sm flex justify-between"
                                  >

                                    <span>
                                      {
                                        update.quarter
                                      }
                                    </span>

                                    <span>
                                      {
                                        update.progressStatus
                                      }
                                    </span>

                                    <span>
                                      Score{" "}
                                      {
                                        update.score
                                      }
                                    </span>

                                  </div>
                                )
                              )}

                            </div>

                          </div>
                        )}

                      </div>
                    )
                  )}

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default MyGoalsPage;