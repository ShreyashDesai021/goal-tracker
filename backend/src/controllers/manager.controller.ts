import {
  Request,
  Response,
} from "express";

import {
  getPendingGoals,
  approveGoalSheet,
  returnForRework,
  getTeamGoals,
} from "../services/manager.service";

export const getPending =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const result =
        await getPendingGoals();

      res.status(200).json(
        result
      );

    } catch (error: any) {

      res.status(400).json({
        message:
          error.message,
      });
    }
  };

export const approve =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const {
        goalSheetId,
      } = req.body;

      const result =
        await approveGoalSheet(
          goalSheetId
        );

      res.status(200).json(
        result
      );

    } catch (error: any) {

      res.status(400).json({
        message:
          error.message,
      });
    }
  };

export const rework =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const {
        goalSheetId,
      } = req.body;

      const result =
        await returnForRework(
          goalSheetId
        );

      res.status(200).json(
        result
      );

    } catch (error: any) {

      res.status(400).json({
        message:
          error.message,
      });
    }
  };

export const teamGoals =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await getTeamGoals();

      res.json(result);

    } catch (error: any) {

      res.status(400).json({
        message:
          error.message,
      });
    }
  };