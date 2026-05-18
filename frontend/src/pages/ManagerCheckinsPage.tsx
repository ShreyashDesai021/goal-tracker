import {
  useEffect,
  useState,
} from "react";

import toast
from "react-hot-toast";

import {
  getTeamCheckins,
  addManagerComment,
} from "../api/checkinApi";

function ManagerCheckinsPage() {

  const [
    updates,
    setUpdates
  ] = useState<any[]>(
    []
  );

  const [
    loading,
    setLoading
  ] = useState(
    true
  );

  const [
    comments,
    setComments
  ] = useState<{
    [key: string]:
    string;
  }>({});

  const loadUpdates =
    async () => {

      try {

        const res =
          await getTeamCheckins();

        setUpdates(
          res
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
    loadUpdates();
  }, []);

  const handleComment =
    async (
      update: any
    ) => {

      try {

        const comment =
          comments[
            update.id
          ];

        if (
          !comment
        ) {

          return toast.error(
            "Enter a comment"
          );
        }

        await addManagerComment({
          employeeId:
            update.goal
            ?.goalSheet
            ?.employeeId,

          goalSheetId:
            update.goal
            ?.goalSheetId,

          quarter:
            update.quarter,

          comment,
        });

        toast.success(
          "Comment added!"
        );

        setComments(
          (
            prev
          ) => ({
            ...prev,
            [
              update.id
            ]: "",
          })
        );

      } catch (
        error: any
      ) {

        toast.error(
          error.response
            ?.data
            ?.message ||
          "Failed to add comment"
        );
      }
    };

  if (
    loading
  ) {

    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading team check-ins...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Team Check-ins
      </h1>

      <div className="space-y-6">

        {updates.length ===
        0 ? (

          <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow-md">
            No team updates found
          </div>

        ) : (

          updates.map(
            (
              update
            ) => (

              <div
                key={
                  update.id
                }
                className="bg-white rounded-2xl shadow-md p-6"
              >

                <div className="flex justify-between items-start mb-4">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {
                        update
                        .goal
                        ?.title
                      }
                    </h2>

                    <p className="text-gray-500">
                      Quarter:
                      {" "}
                      {
                        update
                        .quarter
                      }
                    </p>

                  </div>

                  <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
                    {
                      update
                      .progressStatus
                    }
                  </span>

                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-5">

                  <div>
                    <strong>
                      Target:
                    </strong>{" "}
                    {
                      update
                      .goal
                      ?.target
                    }
                  </div>

                  <div>
                    <strong>
                      Achievement:
                    </strong>{" "}
                    {
                      update
                      .achievement
                    }
                  </div>

                  <div>
                    <strong>
                      Score:
                    </strong>{" "}
                    {
                      update
                      .score
                    }
                  </div>

                </div>

                <textarea
                  placeholder="Add manager comment..."
                  value={
                    comments[
                      update.id
                    ] || ""
                  }
                  onChange={(
                    e
                  ) =>
                    setComments({
                      ...comments,
                      [
                        update.id
                      ]:
                        e.target
                        .value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                />

                <button
                  onClick={() =>
                    handleComment(
                      update
                    )
                  }
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-xl font-semibold"
                >
                  Add Comment
                </button>

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}

export default
ManagerCheckinsPage;