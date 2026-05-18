//src\controllers\goal.controller.ts

import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { goalSchema } from "../validators/goal.validator";

import {
  createGoalSheet,
  getMyGoals,
  getSharedGoals,
} from "../services/goal.service";

export const createGoals =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {

      const validated =
        goalSchema.parse(
          req.body
        );

      const result =
        await createGoalSheet(
          req.user.userId,
          validated.goals
        );

      res.status(201).json(
        result
      );

    } catch (error: any) {

      if (
        error.issues?.length
      ) {
        return res.status(400).json({
          message:
            error.issues[0]
              .message,
        });
      }

      res.status(400).json({
        message:
          error.message,
      });
    }
  };

export const myGoals =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const result =
        await getMyGoals(
          req.user.userId
        );

      res.json(result);

    } catch (error: any) {

      res.status(400).json({
        message:
          error.message,
      });
    }
  };

export const sharedGoals =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const result =
        await getSharedGoals(
          req.user.userId
        );

      res.json(result);

    } catch (
      error: any
    ) {

      res.status(400).json({
        message:
          error.message,
      });
    }
  };