//src\routes\admin.routes.ts

import express from "express";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

import {
  unlockGoal,
  auditLogs,
  addSharedGoal,
} from "../controllers/admin.controller";

const router =
  express.Router();

router.patch(
  "/unlock-goal",
  authenticate,
  authorize("ADMIN"),
  unlockGoal
);

router.get(
  "/audit-logs",
  authenticate,
  authorize("ADMIN"),
  auditLogs
);

router.post(
  "/shared-goals",
  authenticate,
  authorize("ADMIN"),
  addSharedGoal
);

export default router;