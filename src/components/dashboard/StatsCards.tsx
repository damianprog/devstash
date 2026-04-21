import { FolderHeart, FolderOpen, Layers, Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { mockCollections, mockItems } from "@/lib/mock-data";

const stats = [
  {
    label: "Items",
    value: mockItems.length,
    icon: Layers,
  },
  {
    label: "Collections",
    value: mockCollections.length,
    icon: FolderOpen,
  },
  {
    label: "Favorite items",
    value: mockItems.filter((item) => item.isFavorite).length,
    icon: Star,
  },
  {
    label: "Favorite collections",
    value: mockCollections.filter((c) => c.isFavorite).length,
    icon: FolderHeart,
  },
];

export function StatsCards() {
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
