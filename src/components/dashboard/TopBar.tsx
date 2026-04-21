import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopBar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <span className="text-base font-semibold tracking-tight">DevStash</span>
      </div>

      <div className="flex flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search items, collections, tags..."
            aria-label="Search"
            className="h-8 pl-8"
          />
        </div>
      </div>

      <Button size="sm">
        <Plus />
        New
      </Button>
    </header>
  );
}
