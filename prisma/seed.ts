import "dotenv/config";

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import ws from "ws";

import { ContentType, PrismaClient } from "../src/generated/prisma/client.js";

neonConfig.webSocketConstructor = ws;

const DEMO_EMAIL = "demo@devstash.io";

const systemItemTypes = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
];

type SeedItem = {
  title: string;
  description?: string;
  type: "snippet" | "prompt" | "command" | "note" | "link" | "file" | "image";
  content?: string;
  url?: string;
  language?: string;
  tags?: string[];
};

type SeedCollection = {
  name: string;
  description: string;
  defaultType: SeedItem["type"];
  items: SeedItem[];
};

const collections: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    defaultType: "snippet",
    items: [
      {
        title: "useDebounce hook",
        description: "Debounce a changing value across renders.",
        type: "snippet",
        language: "typescript",
        tags: ["react", "hooks"],
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
      },
      {
        title: "Theme context provider",
        description: "Typed context + hook with runtime guard.",
        type: "snippet",
        language: "typescript",
        tags: ["react", "context"],
        content: `"use client";

import { createContext, useContext, type ReactNode } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  ...value
}: ThemeContextValue & { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}`,
      },
      {
        title: "cn() className merger",
        description: "Merge Tailwind classes with conflict resolution.",
        type: "snippet",
        language: "typescript",
        tags: ["tailwind", "utility"],
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    defaultType: "prompt",
    items: [
      {
        title: "Code review prompt",
        description: "Grouped findings by severity.",
        type: "prompt",
        tags: ["review", "quality"],
        content: `You are an expert code reviewer. Review the following code for:

- Correctness and potential bugs
- Readability and naming
- Performance implications
- Security concerns
- Adherence to the project's style guide (if provided)

Return findings as a numbered list grouped by severity: critical, major, minor, nit. Include a one-line suggested fix per finding.

Code:
<paste code here>`,
      },
      {
        title: "Documentation generator",
        description: "Produce TSDoc-style docs for a function or class.",
        type: "prompt",
        tags: ["docs"],
        content: `Generate clear, concise documentation for the following code. Include:

- A one-line summary of what it does
- Parameters and return values (with types)
- Usage example
- Any caveats or side effects

Format as JSDoc / TSDoc. Do not restate what good identifiers already convey.

Code:
<paste code here>`,
      },
      {
        title: "Refactoring assistant",
        description: "Behavior-preserving refactor with per-change rationale.",
        type: "prompt",
        tags: ["refactor"],
        content: `Refactor the following code to improve readability and maintainability WITHOUT changing behavior.

Rules:
- Keep the public API identical
- Extract only where it reduces duplication or clarifies intent
- Prefer standard / idiomatic patterns
- Do not add comments unless the "why" is non-obvious

Return the refactored code, then explain each change in one sentence.

Code:
<paste code here>`,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    defaultType: "snippet",
    items: [
      {
        title: "Next.js multi-stage Dockerfile",
        description: "Minimal production image for a Next.js app.",
        type: "snippet",
        language: "dockerfile",
        tags: ["docker", "nextjs"],
        content: `FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]`,
      },
      {
        title: "Zero-downtime deploy script",
        description: "Build, migrate, then hot-reload via PM2.",
        type: "command",
        language: "bash",
        tags: ["deploy", "pm2"],
        content: `#!/usr/bin/env bash
set -euo pipefail

npm ci
npm run build
npm run db:migrate:deploy
pm2 reload ecosystem.config.cjs --update-env`,
      },
      {
        title: "Dockerfile reference",
        description: "Official Dockerfile syntax reference.",
        type: "link",
        url: "https://docs.docker.com/reference/dockerfile/",
        tags: ["docker"],
      },
      {
        title: "GitHub Actions deployment",
        description: "Deployment patterns and examples in GitHub Actions.",
        type: "link",
        url: "https://docs.github.com/en/actions/use-cases-and-examples/deploying",
        tags: ["ci", "github-actions"],
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    defaultType: "command",
    items: [
      {
        title: "Undo last commit, keep changes staged",
        type: "command",
        language: "bash",
        tags: ["git"],
        content: "git reset --soft HEAD~1",
      },
      {
        title: "Prune all unused Docker data",
        description: "Removes stopped containers, unused networks, images and volumes.",
        type: "command",
        language: "bash",
        tags: ["docker"],
        content: "docker system prune -a --volumes",
      },
      {
        title: "Kill whatever is holding port 3000",
        type: "command",
        language: "bash",
        tags: ["process"],
        content: "lsof -t -i:3000 | xargs -r kill -9",
      },
      {
        title: "Nuke and reinstall node_modules",
        type: "command",
        language: "bash",
        tags: ["npm"],
        content: "rm -rf node_modules package-lock.json && npm install",
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    defaultType: "link",
    items: [
      {
        title: "Tailwind CSS documentation",
        description: "Utility-first CSS framework reference.",
        type: "link",
        url: "https://tailwindcss.com/docs",
        tags: ["css", "tailwind"],
      },
      {
        title: "shadcn/ui",
        description: "Re-usable components built with Radix UI and Tailwind.",
        type: "link",
        url: "https://ui.shadcn.com",
        tags: ["components"],
      },
      {
        title: "Material Design 3",
        description: "Google's design system guidelines and tokens.",
        type: "link",
        url: "https://m3.material.io",
        tags: ["design-system"],
      },
      {
        title: "Lucide icons",
        description: "Beautiful, consistent open-source icons.",
        type: "link",
        url: "https://lucide.dev/icons",
        tags: ["icons"],
      },
    ],
  },
];

function contentTypeFor(type: SeedItem["type"]): ContentType {
  if (type === "link") return ContentType.URL;
  if (type === "file" || type === "image") return ContentType.FILE;
  return ContentType.TEXT;
}

async function upsertSystemItemTypes(prisma: PrismaClient) {
  for (const type of systemItemTypes) {
    const existing = await prisma.itemType.findFirst({
      where: { name: type.name, isSystem: true, userId: null },
    });

    if (existing) {
      await prisma.itemType.update({
        where: { id: existing.id },
        data: { icon: type.icon, color: type.color },
      });
    } else {
      await prisma.itemType.create({
        data: { ...type, isSystem: true },
      });
    }
  }
}

async function main() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  });
  const prisma = new PrismaClient({ adapter });

  await upsertSystemItemTypes(prisma);

  await prisma.user.deleteMany({ where: { email: DEMO_EMAIL } });

  const passwordHash = await bcrypt.hash("12345678", 12);
  const user = await prisma.user.create({
    data: {
      email: DEMO_EMAIL,
      name: "Demo User",
      passwordHash,
      emailVerified: new Date(),
      isPro: false,
    },
  });

  const systemTypes = await prisma.itemType.findMany({
    where: { isSystem: true, userId: null },
  });
  const typeByName = new Map(systemTypes.map((t) => [t.name, t]));

  const tagCache = new Map<string, string>();
  async function upsertTag(name: string): Promise<string> {
    const cached = tagCache.get(name);
    if (cached) return cached;
    const tag = await prisma.tag.create({
      data: { name, userId: user.id },
    });
    tagCache.set(name, tag.id);
    return tag.id;
  }

  let totalItems = 0;

  for (const col of collections) {
    const defaultType = typeByName.get(col.defaultType);
    if (!defaultType) throw new Error(`Missing system type: ${col.defaultType}`);

    const collection = await prisma.collection.create({
      data: {
        name: col.name,
        description: col.description,
        userId: user.id,
        defaultTypeId: defaultType.id,
      },
    });

    for (const seedItem of col.items) {
      const itemType = typeByName.get(seedItem.type);
      if (!itemType) throw new Error(`Missing system type: ${seedItem.type}`);

      const tagIds: string[] = [];
      for (const tag of seedItem.tags ?? []) {
        tagIds.push(await upsertTag(tag));
      }

      await prisma.item.create({
        data: {
          title: seedItem.title,
          description: seedItem.description,
          contentType: contentTypeFor(seedItem.type),
          content: seedItem.content,
          url: seedItem.url,
          language: seedItem.language,
          userId: user.id,
          itemTypeId: itemType.id,
          collections: { create: [{ collectionId: collection.id }] },
          tags: { create: tagIds.map((tagId) => ({ tagId })) },
        },
      });
      totalItems++;
    }
  }

  console.log(`Seeded ${systemItemTypes.length} system item types.`);
  console.log(`Seeded demo user ${DEMO_EMAIL}.`);
  console.log(`Seeded ${collections.length} collections, ${totalItems} items.`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
