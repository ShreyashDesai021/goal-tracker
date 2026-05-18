import { Response }
from "express";

import { AuthRequest }
from "../middlewares/auth.middleware";

import {
  getEmployeeDashboard,
  getManagerDashboard,
  getAdminDashboard,
} from "../services/dashboard.service";

export const employeeDashboard =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const result =
      await getEmployeeDashboard(
        req.user.userId
      );

    res.json(result);
  };

export const managerDashboard =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const result =
      await getManagerDashboard();

    res.json(result);
  };

export const adminDashboard =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const result =
      await getAdminDashboard();

    res.json(result);
  };