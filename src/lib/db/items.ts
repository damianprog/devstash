import { prisma } from "@/lib/prisma";

const DEMO_EMAIL = "demo@devstash.io";

export type DashboardItemType = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type DashboardItem = {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  itemType: DashboardItemType;
  tags: string[];
  createdAt: Date;
  lastUsedAt: Date | null;
};

const itemSelect = {
  id: true,
  title: true,
  description: true,
  isFavorite: true,
  isPinned: true,
  createdAt: true,
  lastUsedAt: true,
  itemType: {
    select: { id: true, name: true, icon: true, color: true },
  },
  tags: {
    select: { tag: { select: { name: true } } },
  },
} as const;

type RawItem = {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
  lastUsedAt: Date | null;
  itemType: DashboardItemType;
  tags: { tag: { name: string } }[];
};

function toDashboardItem(item: RawItem): DashboardItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    itemType: item.itemType,
    tags: item.tags.map(({ tag }) => tag.name),
    createdAt: item.createdAt,
    lastUsedAt: item.lastUsedAt,
  };
}

async function getDemoUserId(): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
    select: { id: true },
  });
  return user?.id ?? null;
}

export async function getPinnedItems(): Promise<DashboardItem[]> {
  const userId = await getDemoUserId();
  if (!userId) return [];

  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    select: itemSelect,
  });

  return items.map(toDashboardItem);
}

export async function getRecentItems(limit = 10): Promise<DashboardItem[]> {
  const userId = await getDemoUserId();
  if (!userId) return [];

  const items = await prisma.item.findMany({
    where: { userId, lastUsedAt: { not: null } },
    orderBy: { lastUsedAt: "desc" },
    take: limit,
    select: itemSelect,
  });

  return items.map(toDashboardItem);
}
