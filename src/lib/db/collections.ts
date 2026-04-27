import { prisma } from "@/lib/prisma";
import { getDemoUserId } from "@/lib/db/demo-user";

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
  const userId = await getDemoUserId();

  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      _count: { select: { items: true } },
      defaultType: {
        select: { id: true, name: true, icon: true, color: true },
      },
      items: {
        take: 100,
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

const sidebarCollectionSelect = {
  id: true,
  name: true,
  isFavorite: true,
  defaultType: { select: { color: true } },
  items: {
    select: {
      item: { select: { itemType: { select: { color: true } } } },
    },
  },
} as const;

type SidebarCollectionRow = {
  id: string;
  name: string;
  isFavorite: boolean;
  defaultType: { color: string } | null;
  items: { item: { itemType: { color: string } } }[];
};

function toSidebarCollection(collection: SidebarCollectionRow): SidebarCollection {
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
}

export async function getSidebarCollections(
  recentsLimit = 8,
): Promise<SidebarCollections> {
  const userId = await getDemoUserId();

  const [favoriteRows, recentRows] = await Promise.all([
    prisma.collection.findMany({
      where: { userId, isFavorite: true },
      orderBy: { updatedAt: "desc" },
      select: sidebarCollectionSelect,
    }),
    prisma.collection.findMany({
      where: { userId, isFavorite: false },
      orderBy: { updatedAt: "desc" },
      take: recentsLimit,
      select: sidebarCollectionSelect,
    }),
  ]);

  return {
    favorites: favoriteRows.map(toSidebarCollection),
    recents: recentRows.map(toSidebarCollection),
  };
}
