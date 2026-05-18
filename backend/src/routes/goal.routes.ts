//src\routes\goal.routes.ts

import express from "express";

import {
  createGoals,
  myGoals,
  sharedGoals,
} from "../controllers/goal.controller";

import { submitGoals }
from "../controllers/goalSubmission.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router =
  express.Router();

router.post(
  "/create",
  authenticate,
  authorize("EMPLOYEE"),
  createGoals
);

router.get(
  "/my-goals",
  authenticate,
  authorize("EMPLOYEE"),
  myGoals
);

router.get(
  "/shared",
  authenticate,
  authorize("EMPLOYEE"),
  sharedGoals
);

router.patch(
  "/submit",
  authenticate,
  authorize("EMPLOYEE"),
  submitGoals
);

export default router;