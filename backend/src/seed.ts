import prisma from "./config/prisma";
import bcrypt from "bcryptjs";

async function seed() {
  const password = await bcrypt.hash(
    "password123",
    10
  );

  await prisma.user.createMany({
    data: [
      {
        name: "Admin User",
        email: "admin@goal.com",
        password,
        role: "ADMIN",
      },
      {
        name: "Manager User",
        email: "manager@goal.com",
        password,
        role: "MANAGER",
      },
      {
        name: "Employee User",
        email: "employee@goal.com",
        password,
        role: "EMPLOYEE",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed complete");
}

seed()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });