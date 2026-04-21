import "dotenv/config";

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

import { PrismaClient } from "../src/generated/prisma/client.js";

neonConfig.webSocketConstructor = ws;

async function main() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  });
  const prisma = new PrismaClient({ adapter });

  const [users, items, collections, itemTypes] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.itemType.findMany({
      where: { isSystem: true },
      orderBy: { name: "asc" },
    }),
  ]);

  console.log("Connection OK.\n");
  console.log(`Users:       ${users}`);
  console.log(`Items:       ${items}`);
  console.log(`Collections: ${collections}`);
  console.log(`\nSystem item types (${itemTypes.length}):`);
  for (const t of itemTypes) {
    console.log(`  - ${t.name.padEnd(8)} ${t.color}  ${t.icon}`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
