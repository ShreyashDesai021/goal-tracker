import express from "express";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

import {
  employeeDashboard,
  managerDashboard,
  adminDashboard,
} from "../controllers/dashboard.controller";

const router =
  express.Router();

router.get(
  "/employee",
  authenticate,
  authorize("EMPLOYEE"),
  employeeDashboard
);

router.get(
  "/manager",
  authenticate,
  authorize("MANAGER"),
  managerDashboard
);

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  adminDashboard
);

export default router;