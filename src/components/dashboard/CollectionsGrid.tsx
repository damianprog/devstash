import Link from "next/link";
import { HelpCircle, Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  getDashboardCollections,
  type DashboardCollection,
  type DashboardCollectionDefaultType,
  type DashboardCollectionType,
} from "@/lib/db/collections";
import { itemTypeIcons } from "@/lib/item-type-icons";

import { CollectionCardMenu } from "./CollectionCardMenu";

export async function CollectionsGrid() {
  const collections = await getDashboardCollections(6);

  if (collections.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Collections
        </h2>
        <Link
          href="/collections"
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          View all
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </section>
  );
}

function CollectionCard({ collection }: { collection: DashboardCollection }) {
  const dominantType = collection.types[0] ?? collection.defaultType;
  const accent = dominantType?.color ?? "var(--border)";

  const iconTypes: Array<DashboardCollectionType | DashboardCollectionDefaultType> =
    collection.types.length > 0
      ? collection.types
      : collection.defaultType
        ? [collection.defaultType]
        : [];

  return (
    <Link href={`/collections/${collection.id}`} className="block">
      <Card
        size="sm"
        className="relative border-l-4 transition-colors hover:bg-muted/40"
        style={{ borderLeftColor: accent }}
      >
        <div className="flex items-start justify-between gap-2 px-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate font-heading text-sm font-medium">
                {collection.name}
              </h3>
              {collection.isFavorite && (
                <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {collection.itemCount} item
              {collection.itemCount === 1 ? "" : "s"}
            </p>
          </div>
          <CollectionCardMenu />
        </div>

        {collection.description && (
          <p className="line-clamp-2 px-4 text-xs text-muted-foreground">
            {collection.description}
          </p>
        )}

        {iconTypes.length > 0 && (
          <div className="flex items-center gap-2 px-4">
            {iconTypes.map((type) => {
              const Icon = itemTypeIcons[type.icon] ?? HelpCircle;
              return (
                <Icon
                  key={type.id}
                  className="size-3.5"
                  style={{ color: type.color }}
                />
              );
            })}
          </div>
        )}
      </Card>
    </Link>
  );
}
