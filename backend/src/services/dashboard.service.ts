import prisma from "../config/prisma";

export const getEmployeeDashboard =
  async (userId: string) => {

    const goalSheets =
      await prisma.goalSheet.findMany({
        where: {
          employeeId: userId,
        },
      });

    const quarterlyUpdates =
      await prisma.quarterlyUpdate.count({
        where: {
          goal: {
            goalSheet: {
              employeeId: userId,
            },
          },
        },
      });

    return {
      totalGoalSheets:
        goalSheets.length,

      approved:
        goalSheets.filter(
          g => g.status ===
          "APPROVED"
        ).length,

      submitted:
        goalSheets.filter(
          g => g.status ===
          "SUBMITTED"
        ).length,

      rework:
        goalSheets.filter(
          g => g.status ===
          "REWORK"
        ).length,

      draft:
        goalSheets.filter(
          g => g.status ===
          "DRAFT"
        ).length,

      quarterlyUpdates,
    };
  };

export const getManagerDashboard =
  async () => {

    const pendingApprovals =
      await prisma.goalSheet.count({
        where: {
          status:
            "SUBMITTED",
        },
      });

    const approvedGoals =
      await prisma.goalSheet.count({
        where: {
          status:
            "APPROVED",
        },
      });

    const employees =
      await prisma.user.count({
        where: {
          role:
            "EMPLOYEE",
        },
      });

    const quarterlyUpdates =
      await prisma.quarterlyUpdate.count();

    return {
      pendingApprovals,
      approvedGoals,
      employees,
      quarterlyUpdates,
    };
  };

export const getAdminDashboard =
  async () => {

    const employees =
      await prisma.user.count({
        where: {
          role:
            "EMPLOYEE",
        },
      });

    const managers =
      await prisma.user.count({
        where: {
          role:
            "MANAGER",
        },
      });

    const admins =
      await prisma.user.count({
        where: {
          role:
            "ADMIN",
        },
      });

    const goalSheets =
      await prisma.goalSheet.count();

    const auditLogs =
      await prisma.auditLog.count();

    return {
      employees,
      managers,
      admins,
      goalSheets,
      auditLogs,
    };
  };