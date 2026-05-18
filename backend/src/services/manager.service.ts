import prisma from "../config/prisma";

export const getPendingGoals =
  async () => {
    return prisma.goalSheet.findMany({
      where: {
        status:
          "SUBMITTED",
      },

      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },

        goals: true,
      },
    });
  };

export const approveGoalSheet =
  async (
    goalSheetId: string
  ) => {
    return prisma.goalSheet.update({
      where: {
        id: goalSheetId,
      },

      data: {
        status:
          "APPROVED",
        isLocked: true,
        approvedAt:
          new Date(),
      },
    });
  };

export const returnForRework =
  async (
    goalSheetId: string
  ) => {
    return prisma.goalSheet.update({
      where: {
        id: goalSheetId,
      },

      data: {
        status:
          "REWORK",
        isLocked:
          false,
        approvedAt:
          null,
      },
    });
  };

export const getTeamGoals =
  async () => {

    return prisma.goalSheet.findMany({
      include: {

        employee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        goals: {
          include: {
            quarterlyUpdates:
              true,
          },
        },
      },

      orderBy: {
        createdAt:
          "desc",
      },
    });
  };