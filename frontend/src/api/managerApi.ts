import api from "./axios";

export const getPendingGoals =
  async () => {

    const res =
      await api.get(
        "/manager/pending-goals"
      );

    return res.data;
  };

export const approveGoalSheet =
  async (
    goalSheetId:
    string
  ) => {

    const res =
      await api.patch(
        "/manager/approve",
        {
          goalSheetId,
        }
      );

    return res.data;
  };

export const reworkGoalSheet =
  async (
    goalSheetId:
    string
  ) => {

    const res =
      await api.patch(
        "/manager/rework",
        {
          goalSheetId,
        }
      );

    return res.data;
  };