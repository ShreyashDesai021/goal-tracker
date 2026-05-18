import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

export const authorize = (
  ...roles: string[]
) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: "Forbidden",
      });
      return;
    }

    next();
  };
};