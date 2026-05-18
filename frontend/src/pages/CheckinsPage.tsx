import {
  useEffect,
  useState,
} from "react";

import toast
from "react-hot-toast";

import {
  getMyGoals,
} from "../api/goalApi";

import {
  createCheckin,
  getMyUpdates,
} from "../api/checkinApi";

function CheckinsPage() {

  const [
    goals,
    setGoals
  ] = useState<any[]>([]);

  const [
    updates,
    setUpdates
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading
  ] = useState(
    true
  );

  const [
    formData,
    setFormData
  ] = useState({
    goalId: "",
    quarter: "Q1",
    achievement: 0,
    progressStatus:
      "ON_TRACK" as
      | "NOT_STARTED"
      | "ON_TRACK"
      | "COMPLETED",
  });

  const loadData =
    async () => {

      try {

        setLoading(
          true
        );

        const goalSheets =
          await getMyGoals();

        const allGoals =
          goalSheets.flatMap(
            (
              sheet: any
            ) =>
              sheet.goals
          );

        setGoals(
          allGoals
        );

        const updateData =
          await getMyUpdates();

        setUpdates(
          updateData
        );

      } catch (
        error
      ) {

        console.error(
          error
        );

        toast.error(
          "Failed to load check-ins"
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit =
    async () => {

      try {

        if (
          !formData.goalId
        ) {

          toast.error(
            "Please select a goal"
          );

          return;
        }

        await createCheckin(
          formData
        );

        toast.success(
          "Quarterly Update Added!"
        );

        setFormData({
          goalId: "",
          quarter: "Q1",
          achievement: 0,
          progressStatus:
            "ON_TRACK",
        });

        loadData();

      } catch (
        error: any
      ) {

        toast.error(
          error.response
            ?.data
            ?.message ||
          "Failed to add update"
        );
      }
    };

  if (
    loading
  ) {

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-2xl font-semibold text-gray-500">
        Loading check-ins...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Quarterly Check-ins
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 space-y-4">

        <select
          value={
            formData.goalId
          }
          onChange={
            (e) =>
              setFormData({
                ...formData,
                goalId:
                  e.target.value,
              })
          }
          className="w-full border p-3 rounded-xl"
        >
          <option value="">
            Select Goal
          </option>

          {goals.map(
            (
              goal
            ) => (

              <option
                key={
                  goal.id
                }
                value={
                  goal.id
                }
              >
                {
                  goal.title
                }
              </option>
            )
          )}
        </select>

        <div className="grid md:grid-cols-3 gap-4">

          <select
            value={
              formData.quarter
            }
            onChange={
              (e) =>
                setFormData({
                  ...formData,
                  quarter:
                    e.target.value,
                })
            }
            className="border p-3 rounded-xl"
          >
            <option value="Q1">
              Q1
            </option>

            <option value="Q2">
              Q2
            </option>

            <option value="Q3">
              Q3
            </option>

            <option value="Q4">
              Q4
            </option>
          </select>

          <input
            type="number"
            placeholder="Achievement"
            value={
              formData
                .achievement
            }
            onChange={
              (e) =>
                setFormData({
                  ...formData,
                  achievement:
                    Number(
                      e.target
                        .value
                    ),
                })
            }
            className="border p-3 rounded-xl"
          />

          <select
            value={
              formData
                .progressStatus
            }
            onChange={
              (e) =>
                setFormData({
                  ...formData,
                  progressStatus:
                    e.target
                      .value as
                    | "NOT_STARTED"
                    | "ON_TRACK"
                    | "COMPLETED",
                })
            }
            className="border p-3 rounded-xl"
          >
            <option value="NOT_STARTED">
              NOT_STARTED
            </option>

            <option value="ON_TRACK">
              ON_TRACK
            </option>

            <option value="COMPLETED">
              COMPLETED
            </option>
          </select>

        </div>

        <button
          onClick={
            handleSubmit
          }
          className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          Submit Update
        </button>

      </div>

      <h2 className="text-2xl font-bold mb-4">
        Previous Updates
      </h2>

      {updates.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500 text-lg">
          No check-ins yet
        </div>

      ) : (

        <div className="space-y-4">

          {updates.map(
            (
              update
            ) => (

              <div
                key={
                  update.id
                }
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
              >

                <h3 className="font-bold text-lg">
                  {
                    update.goal
                      .title
                  }
                </h3>

                <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-700">

                  <span>
                    <strong>
                      Quarter:
                    </strong>{" "}
                    {
                      update
                        .quarter
                    }
                  </span>

                  <span>
                    <strong>
                      Achievement:
                    </strong>{" "}
                    {
                      update
                        .achievement
                    }
                  </span>

                  <span>
                    <strong>
                      Status:
                    </strong>{" "}
                    {
                      update
                        .progressStatus
                    }
                  </span>

                  <span>
                    <strong>
                      Score:
                    </strong>{" "}
                    {
                      update
                        .score
                    }
                  </span>

                </div>

                {update.managerComment && (

                  <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4">

                    <p className="text-sm font-semibold text-indigo-700 mb-1">
                      Manager Comment
                    </p>

                    <p className="text-slate-700">
                      {
                        update.managerComment
                      }
                    </p>

                  </div>
                )}

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default CheckinsPage;