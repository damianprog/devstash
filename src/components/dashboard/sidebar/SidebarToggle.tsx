"use client";

import { PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useSidebar } from "./SidebarContext";

export function SidebarToggle() {
  const { toggle } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggle}
      aria-label="Toggle sidebar"
    >
      <PanelLeft />
    </Button>
  );
}
