//src\controllers\admin.controller.ts

import { Response }
from "express";

import { AuthRequest }
from "../middlewares/auth.middleware";

import {
  unlockGoalSheet,
  getAuditLogs,
  createSharedGoal,
} from "../services/admin.service";

export const unlockGoal =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const {
        goalSheetId
      } = req.body;

      const result =
        await unlockGoalSheet(
          req.user.userId,
          goalSheetId
        );

      res.json(result);

    } catch (
      error: any
    ) {

      res.status(400)
      .json({
        message:
          error.message,
      });
    }
  };

export const auditLogs =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const result =
        await getAuditLogs();

      res.json(result);

    } catch (
      error: any
    ) {

      res.status(400)
      .json({
        message:
          error.message,
      });
    }
  };

export const addSharedGoal =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const {
        title,
        description,
        thrustArea,
        target,
        weightage,
        uomType,
      } = req.body;

      const result =
        await createSharedGoal(
          req.user.userId,
          title,
          description,
          thrustArea,
          target,
          weightage,
          uomType
        );

      res
        .status(201)
        .json(result);

    } catch (
      error: any
    ) {

      res.status(400)
      .json({
        message:
          error.message,
      });
    }
  };