import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = generateToken(
    user.id,
    user.role
  );

  const { password: _, ...safeUser } =
    user;

  return {
    token,
    user: safeUser,
  };
};