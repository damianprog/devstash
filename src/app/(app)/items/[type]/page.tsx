import { notFound } from "next/navigation";

import { mockItemTypes } from "@/lib/mock-data";

type Params = { type: string };

export default async function ItemsByTypePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { type } = await params;
  const itemType = mockItemTypes.find((t) => `${t.name}s` === type);

  if (!itemType) notFound();

  return (
    <div className="space-y-1">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        {itemType.label}
      </h1>
      <p className="text-sm text-muted-foreground">
        {itemType.itemCount} item{itemType.itemCount === 1 ? "" : "s"}
      </p>
    </div>
  );
}
