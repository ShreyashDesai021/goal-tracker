import prisma
from "../config/prisma";

export const unlockGoalSheet =
  async (
    adminId: string,
    goalSheetId: string
  ) => {

    const goalSheet =
      await prisma.goalSheet.findUnique({
        where: {
          id:
            goalSheetId,
        },
      });

    if (!goalSheet) {
      throw new Error(
        "Goal sheet not found"
      );
    }

    if (
      !goalSheet.isLocked
    ) {
      throw new Error(
        "Goal sheet is already unlocked"
      );
    }

    const updatedGoalSheet =
      await prisma.goalSheet.update({
        where: {
          id:
            goalSheetId,
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

    await prisma.auditLog.create({
      data: {
        action:
          "UNLOCK_GOAL_SHEET",

        entity:
          "GoalSheet",

        entityId:
          goalSheetId,

        oldValue:
          JSON.stringify(
            goalSheet
          ),

        newValue:
          JSON.stringify(
            updatedGoalSheet
          ),

        user: {
          connect: {
            id:
              adminId,
          },
        },
      },
    });

    return updatedGoalSheet;
  };

export const getAuditLogs =
  async () => {

    return prisma.auditLog.findMany({
      orderBy: {
        createdAt:
          "desc",
      },

      include: {
        user: {
          select: {
            id:
              true,

            name:
              true,

            email:
              true,

            role:
              true,
          },
        },
      },
    });
  };

export const createSharedGoal =
  async (
    adminId: string,

    title: string,
    description: string,
    thrustArea: string,
    target: number,
    weightage: number,

    uomType:
      | "NUMERIC"
      | "PERCENTAGE"
      | "TIMELINE"
      | "ZERO_BASED"
  ) => {

    const employees =
      await prisma.user.findMany({
        where: {
          role:
            "EMPLOYEE",
        },
      });

    const createdGoals =
      [];

    for (
      const employee
      of employees
    ) {

      const goalSheet =
        await prisma.goalSheet.findFirst({
          where: {
            employeeId:
              employee.id,

            status: {
              in: [
                "DRAFT",
                "REWORK",
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

      // Skip employees
      // without editable sheet
      if (
        !goalSheet
      ) {
        continue;
      }

      // Prevent duplicate
      // shared goals
      const existingGoal =
        await prisma.goal.findFirst({
          where: {
            goalSheetId:
              goalSheet.id,

            title,

            thrustArea,

            isShared:
              true,
          },
        });

      if (
        existingGoal
      ) {
        continue;
      }

      const goal =
        await prisma.goal.create({
          data: {
            goalSheetId:
              goalSheet.id,

            title,
            description,
            thrustArea,
            target,
            weightage,
            uomType,

            isShared:
              true,
          },
        });

      createdGoals.push(
        goal
      );
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        action:
          "SHARED_GOAL_CREATED",

        entity:
          "Goal",

        entityId:
          createdGoals[0]
            ?.id ?? "",

        newValue:
          JSON.stringify({
            title,
            description,
            thrustArea,
            target,
            weightage,
            uomType,
            employeesAffected:
              createdGoals
              .length,
          }),

        user: {
          connect: {
            id:
              adminId,
          },
        },
      },
    });

    return {
      message:
        "Shared goal created",

      totalEmployees:
        employees.length,

      createdCount:
        createdGoals.length,

      createdGoals,
    };
  };