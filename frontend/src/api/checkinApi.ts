import api from "./axios";

export const createCheckin =
  async (
    data: {
      goalId: string;
      quarter: string;
      achievement: number;
      progressStatus:
        | "NOT_STARTED"
        | "ON_TRACK"
        | "COMPLETED";
    }
  ) => {

    const res =
      await api.post(
        "/checkins/update",
        data
      );

    return res.data;
  };

export const getMyUpdates =
  async () => {

    const res =
      await api.get(
        "/checkins/my-updates"
      );

    return res.data;
  };

export const getTeamCheckins =
  async () => {

    const res =
      await api.get(
        "/checkins/team"
      );

    return res.data;
  };

export const addManagerComment =
  async (
    data: {
      employeeId: string;
      goalSheetId: string;
      quarter: string;
      comment: string;
    }
  ) => {

    const res =
      await api.post(
        "/checkins/comment",
        data
      );

    return res.data;
  };