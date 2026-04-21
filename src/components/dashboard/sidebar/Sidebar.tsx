"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { SidebarContent } from "./SidebarContent";
import { useSidebar } from "./SidebarContext";

export function Sidebar() {
  const { isCollapsed, isMobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      <aside
        data-collapsed={isCollapsed}
        className={cn(
          "hidden shrink-0 border-r border-sidebar-border bg-sidebar transition-[width] duration-200 md:block",
          isCollapsed ? "w-14" : "w-60",
        )}
      >
        <SidebarContent variant="desktop" />
      </aside>

      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-72 border-r border-sidebar-border bg-sidebar p-0"
          showCloseButton={false}
        >
          <SheetTitle className="sr-only">Sidebar navigation</SheetTitle>
          <SidebarContent variant="mobile" />
        </SheetContent>
      </Sheet>
    </>
  );
}
