import prisma from "../config/prisma";

import {
  validateQuarterWindow,
} from "../utils/checkinWindow";

const calculateScore = (
  target: number,
  achievement: number,
  uomType: string
) => {

  switch (uomType) {

    case "NUMERIC":
    case "PERCENTAGE":

      return Number(
        (
          (achievement / target)
          * 100
        ).toFixed(2)
      );

    case "ZERO_BASED":

      return achievement === 0
        ? 100
        : 0;

    default:

      return 0;
  }
};

export const updateQuarterlyProgress =
  async (
    goalId: string,
    quarter: string,
    achievement: number,
    progressStatus:
      | "NOT_STARTED"
      | "ON_TRACK"
      | "COMPLETED"
  ) => {

    const goal =
      await prisma.goal.findUnique({
        where: {
          id: goalId,
        },

        include: {
          goalSheet: true,
        },
      });

    if (!goal) {

      throw new Error(
        "Goal not found"
      );
    }

    // Only approved goals
    // can receive quarterly updates
    if (
      goal.goalSheet.status !==
      "APPROVED"
    ) {

      throw new Error(
        "Goals must be approved before check-ins"
      );
    }

    // Quarter validation
    if (
      process.env
        .BYPASS_QUARTER_CHECK !==
      "true"
    ) {

      validateQuarterWindow(
        quarter
      );
    }

    // Prevent duplicate quarter updates
    const existingUpdate =
      await prisma
        .quarterlyUpdate
        .findFirst({
          where: {
            goalId,
            quarter,
          },
        });

    if (
      existingUpdate
    ) {

      throw new Error(
        "Quarter update already exists"
      );
    }

    // Calculate score
    const score =
      calculateScore(
        goal.target,
        achievement,
        goal.uomType
      );

    // Create quarterly update
    return prisma
      .quarterlyUpdate
      .create({
        data: {
          goalId,
          quarter,
          achievement,
          progressStatus,
          score,
        },
      });
  };

export const getTeamCheckins =
  async () => {

    return prisma
      .quarterlyUpdate
      .findMany({
        include: {
          goal: {
            include: {
              goalSheet: true,
            },
          },
        },

        orderBy: {
          createdAt:
            "desc",
        },
      });
  };

export const addManagerComment =
  async (
    managerId: string,
    goalSheetId: string,
    quarter: string,
    comment: string
  ) => {

    const goalSheet =
      await prisma.goalSheet.findUnique({
        where: {
          id: goalSheetId,
        },
      });

    if (!goalSheet) {

      throw new Error(
        "Goal sheet not found"
      );
    }

    return prisma
      .checkIn
      .create({
        data: {
          managerId,
          employeeId:
            goalSheet.employeeId,
          goalSheetId,
          quarter,
          comment,
        },
      });
  };

export const getMyUpdates =
  async (
    employeeId: string
  ) => {

    return prisma
      .quarterlyUpdate
      .findMany({
        where: {
          goal: {
            goalSheet: {
              employeeId,
            },
          },
        },

        include: {
          goal: true,
        },

        orderBy: {
          createdAt:
            "desc",
        },
      });
  };