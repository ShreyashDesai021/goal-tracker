import prisma from "../config/prisma";

export const getGoalExportData =
  async () => {

    const goalSheets =
      await prisma.goalSheet.findMany({
        include: {
          employee: {
            select: {
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
      });

    const rows: any[] = [];

    for (const sheet of goalSheets) {

      for (const goal of sheet.goals) {

        if (
          goal.quarterlyUpdates
            .length === 0
        ) {

          rows.push({
            employee:
              sheet.employee.name,

            email:
              sheet.employee.email,

            goal:
              goal.title,

            thrustArea:
              goal.thrustArea,

            target:
              goal.target,

            weightage:
              goal.weightage,

            quarter:
              null,

            achievement:
              null,

            score:
              null,

            status:
              sheet.status,
          });

          continue;
        }

        for (
          const update
          of goal
            .quarterlyUpdates
        ) {

          rows.push({
            employee:
              sheet.employee.name,

            email:
              sheet.employee.email,

            goal:
              goal.title,

            thrustArea:
              goal.thrustArea,

            target:
              goal.target,

            weightage:
              goal.weightage,

            quarter:
              update.quarter,

            achievement:
              update.achievement,

            score:
              update.score,

            progressStatus:
              update.progressStatus,

            status:
              sheet.status,
          });
        }
      }
    }

    return rows;
  };
