import api from "./axios";

export const createSharedGoal =
  async (
    data: any
  ) => {

    const res =
      await api.post(
        "/admin/shared-goals",
        data
      );

    return res.data;
  };

export const getAuditLogs =
  async () => {

    const res =
      await api.get(
        "/admin/audit-logs"
      );

    return res.data;
  };