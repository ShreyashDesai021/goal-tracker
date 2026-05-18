import { Response } from "express";
import { Parser } from "json2csv";

import {
  getGoalExportData,
} from "../services/export.service";

export const exportGoals =
  async (
    req: any,
    res: Response
  ) => {
    try {

      const data =
        await getGoalExportData();

      const parser =
        new Parser();

      const csv =
        parser.parse(
          data
        );

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      res.header(
        "Content-Type",
        "text/csv"
      );

      res.attachment(
        `goal-report-${today}.csv`
      );

      return res.send(
        csv
      );

    } catch (
      error: any
    ) {

      res.status(400)
      .json({
        message:
          error.message,
      });
    }
  };