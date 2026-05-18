import prisma from "../config/prisma";

export const submitGoalSheet =
  async (
    goalSheetId: string,
    employeeId: string
  ) => {
    const goalSheet =
      await prisma.goalSheet.findFirst({
        where: {
          id: goalSheetId,
          employeeId,
        },
      });

    if (!goalSheet) {
      throw new Error(
        "Goal sheet not found"
      );
    }

    if (goalSheet.totalWeight !== 100) {
      throw new Error(
        "Total weightage must be 100%"
      );
    }

    return prisma.goalSheet.update({
      where: {
        id: goalSheetId,
      },
      data: {
        status: "SUBMITTED",
        submittedAt: new Date(),
      },
    });
  };