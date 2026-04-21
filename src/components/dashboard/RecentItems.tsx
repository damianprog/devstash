import { Clock } from "lucide-react";

import { mockItems } from "@/lib/mock-data";

import { ItemRow } from "./ItemRow";

const recentItems = [...mockItems]
  .filter((item) => item.lastUsedAt)
  .sort(
    (a, b) =>
      new Date(b.lastUsedAt!).getTime() - new Date(a.lastUsedAt!).getTime(),
  )
  .slice(0, 10);

export function RecentItems() {
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
