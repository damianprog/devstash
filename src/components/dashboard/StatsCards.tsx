import { FolderHeart, FolderOpen, Layers, Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/db/stats";

export async function StatsCards() {
  const { itemsCount, collectionsCount, favoriteItemsCount, favoriteCollectionsCount } =
    await getDashboardStats();

  const stats = [
    { label: "Items", value: itemsCount, icon: Layers },
    { label: "Collections", value: collectionsCount, icon: FolderOpen },
    { label: "Favorite items", value: favoriteItemsCount, icon: Star },
    { label: "Favorite collections", value: favoriteCollectionsCount, icon: FolderHeart },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label} size="sm">
          <div className="flex items-center justify-between gap-2 px-4">
            <span className="text-xs font-medium text-muted-foreground">
              {label}
            </span>
            <Icon className="size-4 text-muted-foreground" />
          </div>
          <div className="px-4 font-heading text-2xl font-semibold tabular-nums">
            {value}
          </div>
        </Card>
      ))}
    </div>
  );
}
