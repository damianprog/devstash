import { notFound } from "next/navigation";

import { getSidebarItemTypes } from "@/lib/db/items";

type Params = { type: string };

export default async function ItemsByTypePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { type } = await params;
  const itemTypes = await getSidebarItemTypes();
  const itemType = itemTypes.find((t) => `${t.name}s` === type);

  if (!itemType) notFound();

  return (
    <div className="space-y-1">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        {itemType.label}
      </h1>
      <p className="text-sm text-muted-foreground">
        {itemType.count} item{itemType.count === 1 ? "" : "s"}
      </p>
    </div>
  );
}
