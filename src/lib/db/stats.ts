import { prisma } from "@/lib/prisma";
import { getDemoUserId } from "@/lib/db/demo-user";

export type DashboardStats = {
  itemsCount: number;
  collectionsCount: number;
  favoriteItemsCount: number;
  favoriteCollectionsCount: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const userId = await getDemoUserId();

  const [itemsCount, collectionsCount, favoriteItemsCount, favoriteCollectionsCount] =
    await Promise.all([
      prisma.item.count({ where: { userId } }),
      prisma.collection.count({ where: { userId } }),
      prisma.item.count({ where: { userId, isFavorite: true } }),
      prisma.collection.count({ where: { userId, isFavorite: true } }),
    ]);

  return {
    itemsCount,
    collectionsCount,
    favoriteItemsCount,
    favoriteCollectionsCount,
  };
}
