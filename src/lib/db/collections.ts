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
