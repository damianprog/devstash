import "dotenv/config";

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

import { PrismaClient } from "../src/generated/prisma/client.js";

neonConfig.webSocketConstructor = ws;

const DEMO_EMAIL = "demo@devstash.io";

async function main() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  });
  const prisma = new PrismaClient({ adapter });

  const [users, items, collectionsCount, tags, systemTypes] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.tag.count(),
    prisma.itemType.findMany({
      where: { isSystem: true, userId: null },
      orderBy: { name: "asc" },
    }),
  ]);

  console.log("Connection OK.\n");
  console.log(`Users:       ${users}`);
  console.log(`Collections: ${collectionsCount}`);
  console.log(`Items:       ${items}`);
  console.log(`Tags:        ${tags}`);

  console.log(`\nSystem item types (${systemTypes.length}):`);
  for (const t of systemTypes) {
    console.log(`  - ${t.name.padEnd(8)} ${t.color}  ${t.icon}`);
  }

  const demoUser = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
    include: {
      collections: {
        orderBy: { name: "asc" },
        include: {
          defaultType: { select: { name: true, color: true } },
          items: {
            orderBy: { addedAt: "asc" },
            include: {
              item: {
                include: {
                  itemType: { select: { name: true } },
                  tags: { include: { tag: { select: { name: true } } } },
                },
              },
            },
          },
        },
      },
      tags: { orderBy: { name: "asc" } },
    },
  });

  if (!demoUser) {
    console.log(`\nNo demo user (${DEMO_EMAIL}) found — seed hasn't run.`);
    await prisma.$disconnect();
    return;
  }

  console.log(`\nDemo user:`);
  console.log(`  email:         ${demoUser.email}`);
  console.log(`  name:          ${demoUser.name ?? "(none)"}`);
  console.log(`  isPro:         ${demoUser.isPro}`);
  console.log(
    `  emailVerified: ${demoUser.emailVerified?.toISOString() ?? "(none)"}`,
  );
  console.log(`  passwordHash:  ${demoUser.passwordHash ? "set" : "missing"}`);

  console.log(`\nCollections (${demoUser.collections.length}):`);
  for (const col of demoUser.collections) {
    const defaultType = col.defaultType?.name ?? "(none)";
    console.log(`\n  ${col.name}  [default: ${defaultType}]`);
    console.log(`    ${col.description ?? ""}`);
    console.log(`    ${col.items.length} items:`);
    for (const { item } of col.items) {
      const tags = item.tags.map((t) => `#${t.tag.name}`).join(" ");
      console.log(
        `      · [${item.itemType.name.padEnd(7)}] ${item.title}${tags ? "  " + tags : ""}`,
      );
    }
  }

  console.log(`\nDemo user tags (${demoUser.tags.length}):`);
  console.log(`  ${demoUser.tags.map((t) => t.name).join(", ") || "(none)"}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
