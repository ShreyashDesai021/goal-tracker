//src/routes/checkin.routes.ts

import express
from "express";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

import {
  updateProgress,
  getTeam,
  addComment,
  myUpdates,
} from "../controllers/checkin.controller";

const router =
  express.Router();

router.post(
  "/update",
  authenticate,
  authorize(
    "EMPLOYEE"
  ),
  updateProgress
);

router.get(
  "/my-updates",
  authenticate,
  authorize(
    "EMPLOYEE"
  ),
  myUpdates
);

router.get(
  "/team",
  authenticate,
  authorize(
    "MANAGER"
  ),
  getTeam
);

router.post(
  "/comment",
  authenticate,
  authorize(
    "MANAGER"
  ),
  addComment
);

export default router;