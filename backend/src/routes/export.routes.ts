import express from "express";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

import {
  exportGoals,
} from "../controllers/export.controller";

const router =
  express.Router();

router.get(
  "/goals",
  authenticate,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  exportGoals
);

export default router;
