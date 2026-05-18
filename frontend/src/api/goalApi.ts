import api from "./axios";

export const getMyGoals =
  async () => {

    const res =
      await api.get(
        "/goals/my-goals"
      );

    return res.data;
  };

export const createGoals =
  async (
    data: any
  ) => {

    const res =
      await api.post(
        "/goals/create",
        data
      );

    return res.data;
  };

export const submitGoalSheet =
  async (
    goalSheetId:
    string
  ) => {

    const res =
      await api.patch(
        "/goals/submit",
        {
          goalSheetId,
        }
      );

    return res.data;
  };