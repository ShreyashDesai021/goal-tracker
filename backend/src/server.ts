import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import goalRoutes from "./routes/goal.routes";
import managerRoutes from "./routes/manager.routes";
import checkinRoutes from "./routes/checkin.routes";
import adminRoutes from "./routes/admin.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import exportRoutes from "./routes/export.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/checkins", checkinRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/export", exportRoutes);

app.get("/", (req, res) => {
  res.send("Goal Tracker API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});