"use client";

import Link from "next/link";
import { HelpCircle, MoreHorizontal, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { itemTypeIcons } from "@/lib/item-type-icons";
import {
  mockCollections,
  mockItems,
  mockItemTypes,
  type MockCollection,
  type MockItemType,
} from "@/lib/mock-data";

const typeById = new Map(mockItemTypes.map((type) => [type.id, type]));

function getCollectionTypes(collection: MockCollection): MockItemType[] {
  const typeIds = new Set<string>();
  for (const item of mockItems) {
    if (item.collectionIds.includes(collection.id)) {
      typeIds.add(item.itemTypeId);
    }
  }
  if (typeIds.size === 0) typeIds.add(collection.defaultTypeId);

  return [...typeIds]
    .map((id) => typeById.get(id))
    .filter((t): t is MockItemType => Boolean(t));
}

export function CollectionsGrid() {
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
        {mockCollections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </section>
  );
}

function CollectionCard({ collection }: { collection: MockCollection }) {
  const defaultType = typeById.get(collection.defaultTypeId);
  const types = getCollectionTypes(collection);
  const accent = defaultType?.color ?? "var(--border)";

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
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Collection options"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <MoreHorizontal />
          </Button>
        </div>

        {collection.description && (
          <p className="line-clamp-2 px-4 text-xs text-muted-foreground">
            {collection.description}
          </p>
        )}

        <div className="flex items-center gap-2 px-4">
          {types.map((type) => {
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
      </Card>
    </Link>
  );
}
