import { HelpCircle, Pin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { itemTypeIcons } from "@/lib/item-type-icons";
import { mockItemTypes, type MockItem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const typeById = new Map(mockItemTypes.map((type) => [type.id, type]));

function formatShortDate(iso: string | null) {
  if (!iso) return null;
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ItemRow({
  item,
  dateLabel = "created",
}: {
  item: MockItem;
  dateLabel?: "created" | "lastUsed";
}) {
  const type = typeById.get(item.itemTypeId);
  const Icon = type ? (itemTypeIcons[type.icon] ?? HelpCircle) : HelpCircle;
  const accent = type?.color ?? "var(--border)";

  const dateIso = dateLabel === "lastUsed" ? item.lastUsedAt : item.createdAt;
  const formattedDate = formatShortDate(dateIso);

  return (
    <Card
      size="sm"
      className={cn(
        "border-l-4 transition-colors hover:bg-muted/40",
        "cursor-pointer",
      )}
      style={{ borderLeftColor: accent }}
    >
      <div className="flex items-start gap-3 px-4">
        <span
          className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md"
          style={{ backgroundColor: `${accent}1f`, color: accent }}
        >
          <Icon className="size-3.5" />
        </span>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-heading text-sm font-medium">
              {item.title}
            </h3>
            {item.isPinned && (
              <Pin className="size-3.5 shrink-0 text-muted-foreground" />
            )}
            {item.isFavorite && (
              <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
            )}
          </div>

          {item.description && (
            <p className="line-clamp-1 text-xs text-muted-foreground">
              {item.description}
            </p>
          )}

          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {formattedDate && (
          <span className="shrink-0 pt-0.5 text-xs tabular-nums text-muted-foreground">
            {formattedDate}
          </span>
        )}
      </div>
    </Card>
  );
}
