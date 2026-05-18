import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { submitGoalSheet }
from "../services/goalSubmission.service";

export const submitGoals =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const { goalSheetId } =
        req.body;

      const result =
        await submitGoalSheet(
          goalSheetId,
          req.user.userId
        );

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  };