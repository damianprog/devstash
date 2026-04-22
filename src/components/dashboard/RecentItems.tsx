import { Clock } from "lucide-react";

import { getRecentItems } from "@/lib/db/items";

import { ItemRow } from "./ItemRow";

export async function RecentItems() {
  const recentItems = await getRecentItems(10);

  if (recentItems.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-1.5">
        <Clock className="size-4 text-muted-foreground" />
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Recent
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        {recentItems.map((item) => (
          <ItemRow key={item.id} item={item} dateLabel="lastUsed" />
        ))}
      </div>
    </section>
  );
}
