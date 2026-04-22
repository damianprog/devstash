import { Pin } from "lucide-react";

import { getPinnedItems } from "@/lib/db/items";

import { ItemRow } from "./ItemRow";

export async function PinnedItems() {
  const pinnedItems = await getPinnedItems();

  if (pinnedItems.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-1.5">
        <Pin className="size-4 text-muted-foreground" />
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Pinned
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        {pinnedItems.map((item) => (
          <ItemRow key={item.id} item={item} dateLabel="created" />
        ))}
      </div>
    </section>
  );
}
