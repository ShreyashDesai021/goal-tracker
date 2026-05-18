import express from "express";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

import {
  getPending,
  approve,
  rework,
  teamGoals,
} from "../controllers/manager.controller";

const router =
  express.Router();

router.get(
  "/pending-goals",
  authenticate,
  authorize("MANAGER"),
  getPending
);

router.get(
  "/team-goals",
  authenticate,
  authorize("MANAGER"),
  teamGoals
);

router.patch(
  "/approve",
  authenticate,
  authorize("MANAGER"),
  approve
);

router.patch(
  "/rework",
  authenticate,
  authorize("MANAGER"),
  rework
);

export default router;