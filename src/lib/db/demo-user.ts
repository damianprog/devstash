import { prisma } from "@/lib/prisma";

export const DEMO_EMAIL = "demo@devstash.io";

export async function getDemoUserId(): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
    select: { id: true },
  });
  if (!user) {
    throw new Error(
      `Demo user not found (email: ${DEMO_EMAIL}). Run \`npm run db:seed\`.`,
    );
  }
  return user.id;
}
