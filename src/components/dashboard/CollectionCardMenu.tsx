"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CollectionCardMenu() {
  return (
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
  );
}
