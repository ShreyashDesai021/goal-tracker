//src\services\goal.service.ts

import prisma from "../config/prisma";

export const createGoalSheet =
  async (
    employeeId: string,
    goals: any[]
  ) => {

    const existingGoalSheet =
      await prisma.goalSheet.findFirst({
        where: {
          employeeId,

          status: {
            in: [
              "DRAFT",
              "REWORK",
              "SUBMITTED",
            ],
          },

          isLocked:
            false,
        },

        orderBy: {
          createdAt:
            "desc",
        },
      });

    if (
      existingGoalSheet
    ) {
      throw new Error(
        "Active goal sheet already exists"
      );
    }

    const totalWeight =
      goals.reduce(
        (
          sum,
          goal
        ) =>
          sum +
          goal.weightage,
        0
      );

    if (
      totalWeight !==
      100
    ) {
      throw new Error(
        "Total weightage must equal 100%"
      );
    }

    if (
      goals.length > 8
    ) {
      throw new Error(
        "Maximum 8 goals allowed"
      );
    }

    const goalSheet =
      await prisma.goalSheet.create({
        data: {
          employeeId,
          totalWeight,

          status:
            "DRAFT",

          goals: {
            create:
              goals,
          },
        },

        include: {
          goals:
            true,
        },
      });

    return goalSheet;
  };

export const getMyGoals =
  async (
    employeeId: string
  ) => {

    return prisma.goalSheet.findMany({
      where: {
        employeeId,
      },

      include: {
        goals: {
          include: {
            quarterlyUpdates: true,
          },
        },
      },

      orderBy: {
        createdAt:
          "desc",
      },
    });
  };

export const getSharedGoals =
  async (
    employeeId: string
  ) => {

    const sheet =
      await prisma.goalSheet.findFirst({
        where: {
          employeeId,
        },

        orderBy: {
          createdAt:
            "desc",
        },

        include: {
          goals: {
            where: {
              isShared:
                true,
            },

            include: {
              quarterlyUpdates:
                true,
            },
          },
        },
      });

    return sheet?.goals ?? [];
  };