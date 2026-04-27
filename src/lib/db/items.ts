import { prisma } from "@/lib/prisma";
import { getDemoUserId } from "@/lib/db/demo-user";

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

export async function getPinnedItems(): Promise<DashboardItem[]> {
  const userId = await getDemoUserId();

  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    select: itemSelect,
  });

  return items.map(toDashboardItem);
}

export async function getRecentItems(limit = 10): Promise<DashboardItem[]> {
  const userId = await getDemoUserId();

  const items = await prisma.item.findMany({
    where: { userId, lastUsedAt: { not: null } },
    orderBy: { lastUsedAt: "desc" },
    take: limit,
    select: itemSelect,
  });

  return items.map(toDashboardItem);
}

export type SidebarItemType = {
  id: string;
  name: string;
  label: string;
  icon: string;
  color: string;
  count: number;
};

function pluralLabel(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1) + "s";
}

export async function getSidebarItemTypes(): Promise<SidebarItemType[]> {
  const userId = await getDemoUserId();

  const systemTypes = await prisma.itemType.findMany({
    where: { isSystem: true, userId: null },
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, icon: true, color: true },
  });

  const counts = await prisma.item.groupBy({
    by: ["itemTypeId"],
    where: { userId },
    _count: { _all: true },
  });
  const countByTypeId = new Map(
    counts.map((c) => [c.itemTypeId, c._count._all]),
  );

  return systemTypes.map((type) => ({
    ...type,
    label: pluralLabel(type.name),
    count: countByTypeId.get(type.id) ?? 0,
  }));
}
