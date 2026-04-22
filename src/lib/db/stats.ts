import { prisma } from "@/lib/prisma";

const DEMO_EMAIL = "demo@devstash.io";

export type DashboardStats = {
  itemsCount: number;
  collectionsCount: number;
  favoriteItemsCount: number;
  favoriteCollectionsCount: number;
};

const EMPTY_STATS: DashboardStats = {
  itemsCount: 0,
  collectionsCount: 0,
  favoriteItemsCount: 0,
  favoriteCollectionsCount: 0,
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
    select: { id: true },
  });
  if (!user) return EMPTY_STATS;

  const [itemsCount, collectionsCount, favoriteItemsCount, favoriteCollectionsCount] =
    await Promise.all([
      prisma.item.count({ where: { userId: user.id } }),
      prisma.collection.count({ where: { userId: user.id } }),
      prisma.item.count({ where: { userId: user.id, isFavorite: true } }),
      prisma.collection.count({ where: { userId: user.id, isFavorite: true } }),
    ]);

  return {
    itemsCount,
    collectionsCount,
    favoriteItemsCount,
    favoriteCollectionsCount,
  };
}
