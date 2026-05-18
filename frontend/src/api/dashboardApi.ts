import api from "./axios";

export const getEmployeeDashboard =
  async () => {

    const res =
      await api.get(
        "/dashboard/employee"
      );

    return res.data;
  };

export const getManagerDashboard =
  async () => {

    const res =
      await api.get(
        "/dashboard/manager"
      );

    return res.data;
  };

export const getAdminDashboard =
  async () => {

    const res =
      await api.get(
        "/dashboard/admin"
      );

    return res.data;
  };