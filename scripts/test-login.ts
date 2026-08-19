import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

async function main() {
  const url = process.env.DATABASE_URL || process.env.DIRECT_URL;
  console.log("Using URL:", (url || "").slice(0, 70));
  const adapter = new PrismaPg({ connectionString: url });
  const prisma = new PrismaClient({ adapter });
  try {
    const user = await prisma.user.findUnique({
      where: { email: "admin@jobportal.demo" },
    });
    console.log("Found user:", user?.email, "role:", user?.role);
    if (user?.password) {
      const ok = await bcrypt.compare("Demo123!", user.password);
      console.log("Password matches:", ok);
    }
    const count = await prisma.user.count();
    console.log("Total users:", count);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.log("ERROR:", message.slice(0, 500));
  }
}

main();