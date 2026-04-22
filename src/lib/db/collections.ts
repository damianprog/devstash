import { prisma } from "@/lib/prisma";

const DEMO_EMAIL = "demo@devstash.io";

export type DashboardCollectionType = {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
};

export type DashboardCollectionDefaultType = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type DashboardCollection = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  types: DashboardCollectionType[];
  defaultType: DashboardCollectionDefaultType | null;
};

export async function getDashboardCollections(
  limit = 6,
): Promise<DashboardCollection[]> {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
    select: { id: true },
  });
  if (!user) return [];

  const collections = await prisma.collection.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      _count: { select: { items: true } },
      defaultType: {
        select: { id: true, name: true, icon: true, color: true },
      },
      items: {
        select: {
          item: {
            select: {
              itemType: {
                select: { id: true, name: true, icon: true, color: true },
              },
            },
          },
        },
      },
    },
  });

  return collections.map((collection) => {
    const typeCounts = new Map<string, DashboardCollectionType>();
    for (const { item } of collection.items) {
      const t = item.itemType;
      const existing = typeCounts.get(t.id);
      if (existing) {
        existing.count++;
      } else {
        typeCounts.set(t.id, {
          id: t.id,
          name: t.name,
          icon: t.icon,
          color: t.color,
          count: 1,
        });
      }
    }

    const types = [...typeCounts.values()].sort((a, b) => b.count - a.count);

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isFavorite: collection.isFavorite,
      itemCount: collection._count.items,
      types,
      defaultType: collection.defaultType,
    };
  });
}

export type SidebarCollection = {
  id: string;
  name: string;
  isFavorite: boolean;
  dominantTypeColor: string | null;
};

export type SidebarCollections = {
  favorites: SidebarCollection[];
  recents: SidebarCollection[];
};

export async function getSidebarCollections(
  recentsLimit = 8,
): Promise<SidebarCollections> {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
    select: { id: true },
  });
  if (!user) return { favorites: [], recents: [] };

  const collections = await prisma.collection.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      isFavorite: true,
      defaultType: { select: { color: true } },
      items: {
        select: {
          item: { select: { itemType: { select: { color: true } } } },
        },
      },
    },
  });

  const mapped: SidebarCollection[] = collections.map((collection) => {
    const colorCounts = new Map<string, number>();
    for (const { item } of collection.items) {
      const color = item.itemType.color;
      colorCounts.set(color, (colorCounts.get(color) ?? 0) + 1);
    }

    let dominantTypeColor: string | null = collection.defaultType?.color ?? null;
    let topCount = 0;
    for (const [color, count] of colorCounts) {
      if (count > topCount) {
        topCount = count;
        dominantTypeColor = color;
      }
    }

    return {
      id: collection.id,
      name: collection.name,
      isFavorite: collection.isFavorite,
      dominantTypeColor,
    };
  });

  const favorites = mapped.filter((c) => c.isFavorite);
  const recents = mapped.filter((c) => !c.isFavorite).slice(0, recentsLimit);

  return { favorites, recents };
}
