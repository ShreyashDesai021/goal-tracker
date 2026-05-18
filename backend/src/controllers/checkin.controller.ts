//src/controllers/checkin.controller.ts

import { Response }
from "express";

import { AuthRequest }
from "../middlewares/auth.middleware";

import {
  updateQuarterlyProgress,
  getTeamCheckins,
  addManagerComment,
  getMyUpdates,
} from "../services/checkin.service";

export const updateProgress =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const {
        goalId,
        quarter,
        achievement,
        progressStatus,
      } = req.body;

      const result =
        await updateQuarterlyProgress(
          goalId,
          quarter,
          achievement,
          progressStatus
        );

      res
        .status(201)
        .json(result);

    } catch (
      error: any
    ) {

      res
        .status(400)
        .json({
          message:
            error.message,
        });
    }
  };

export const getTeam =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const result =
        await getTeamCheckins();

      res.json(
        result
      );

    } catch (
      error: any
    ) {

      res
        .status(400)
        .json({
          message:
            error.message,
        });
    }
  };

export const addComment =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const {
        goalSheetId,
        quarter,
        comment,
      } = req.body;

      const result =
        await addManagerComment(
          req.user.userId,
          goalSheetId,
          quarter,
          comment
        );

      res.json(
        result
      );

    } catch (
      error: any
    ) {

      res
        .status(400)
        .json({
          message:
            error.message,
        });
    }
  };

export const myUpdates =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const updates =
        await getMyUpdates(
          req.user.userId
        );

      res.json(
        updates
      );

    } catch (
      error: any
    ) {

      res
        .status(400)
        .json({
          message:
            error.message,
        });
    }
  };