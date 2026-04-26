"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  HelpCircle,
  Settings,
  Star,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  SidebarCollection,
  SidebarCollections,
} from "@/lib/db/collections";
import type { SidebarItemType } from "@/lib/db/items";
import { mockUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import { itemTypeIcons } from "@/lib/item-type-icons";

import { useSidebar } from "./SidebarContext";

type Group = "types" | "collections";

const PRO_TYPE_NAMES = new Set(["file", "image"]);

export function SidebarContent({
  variant,
  itemTypes,
  collections,
}: {
  variant: "desktop" | "mobile";
  itemTypes: SidebarItemType[];
  collections: SidebarCollections;
}) {
  const { isCollapsed, setMobileOpen } = useSidebar();
  const collapsed = variant === "desktop" && isCollapsed;
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<Record<Group, boolean>>({
    types: true,
    collections: true,
  });

  const toggleGroup = (group: Group) =>
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));

  const handleNavigate = () => {
    if (variant === "mobile") setMobileOpen(false);
  };

  const { favorites, recents } = collections;

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <SidebarBrand collapsed={collapsed} />

      <div className="flex-1 overflow-y-auto px-2 py-3">
        <SidebarGroup
          title="Types"
          open={openGroups.types}
          onToggle={() => toggleGroup("types")}
          collapsed={collapsed}
        >
          {itemTypes.map((type) => {
            const Icon = itemTypeIcons[type.icon] ?? HelpCircle;
            const href = `/items/${type.name}s`;
            const active = pathname === href;
            const isPro = PRO_TYPE_NAMES.has(type.name);
            return (
              <SidebarLink
                key={type.id}
                href={href}
                label={type.label}
                icon={<Icon style={{ color: type.color }} />}
                trailing={
                  <span className="flex items-center gap-1.5">
                    {isPro && <ProBadge />}
                    <Count value={type.count} />
                  </span>
                }
                active={active}
                collapsed={collapsed}
                onNavigate={handleNavigate}
              />
            );
          })}
        </SidebarGroup>

        <div className="my-3" />

        <SidebarGroup
          title="Collections"
          open={openGroups.collections}
          onToggle={() => toggleGroup("collections")}
          collapsed={collapsed}
        >
          {favorites.length > 0 && (
            <SidebarSubheading collapsed={collapsed}>
              Favorites
            </SidebarSubheading>
          )}
          {favorites.map((collection) => (
            <CollectionLink
              key={collection.id}
              collection={collection}
              pathname={pathname}
              collapsed={collapsed}
              onNavigate={handleNavigate}
              showStar
            />
          ))}

          {recents.length > 0 && (
            <SidebarSubheading collapsed={collapsed} className="mt-2">
              Recent
            </SidebarSubheading>
          )}
          {recents.map((collection) => (
            <CollectionLink
              key={collection.id}
              collection={collection}
              pathname={pathname}
              collapsed={collapsed}
              onNavigate={handleNavigate}
            />
          ))}

          <ViewAllCollectionsLink
            collapsed={collapsed}
            active={pathname === "/collections"}
            onNavigate={handleNavigate}
          />
        </SidebarGroup>
      </div>

      <Separator />
      <SidebarUser collapsed={collapsed} />
    </div>
  );
}

function SidebarBrand({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={cn(
        "flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-3",
        collapsed && "justify-center px-2",
      )}
    >
      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
        S
      </div>
      {!collapsed && (
        <span className="truncate text-sm font-semibold tracking-tight">
          DevStash
        </span>
      )}
    </div>
  );
}

function SidebarGroup({
  title,
  open,
  onToggle,
  collapsed,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  collapsed: boolean;
  children: React.ReactNode;
}) {
  if (collapsed) {
    return <div className="flex flex-col gap-0.5">{children}</div>;
  }
  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        onClick={onToggle}
        className="flex h-7 items-center justify-between rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn("size-3.5 transition-transform", !open && "-rotate-90")}
        />
      </button>
      {open && <div className="flex flex-col gap-0.5">{children}</div>}
    </div>
  );
}

function SidebarSubheading({
  children,
  collapsed,
  className,
}: {
  children: React.ReactNode;
  collapsed: boolean;
  className?: string;
}) {
  if (collapsed) return null;
  return (
    <div
      className={cn(
        "px-2 pt-1 pb-0.5 text-[10px] font-medium tracking-wider text-muted-foreground/70 uppercase",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SidebarLink({
  href,
  label,
  icon,
  trailing,
  active,
  collapsed,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  trailing?: React.ReactNode;
  active?: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const link = (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex h-8 items-center gap-2 rounded-md px-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-accent text-sidebar-accent-foreground",
        collapsed && "justify-center px-0",
      )}
    >
      <span className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-4">
        {icon}
      </span>
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {trailing}
        </>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }
  return link;
}

function CollectionLink({
  collection,
  pathname,
  collapsed,
  onNavigate,
  showStar = false,
}: {
  collection: SidebarCollection;
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
  showStar?: boolean;
}) {
  const href = `/collections/${collection.id}`;
  const active = pathname === href;
  const icon = showStar ? (
    <Folder className="text-muted-foreground" />
  ) : (
    <TypeColorDot color={collection.dominantTypeColor} />
  );

  return (
    <SidebarLink
      href={href}
      label={collection.name}
      icon={icon}
      trailing={
        showStar ? (
          <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
        ) : undefined
      }
      active={active}
      collapsed={collapsed}
      onNavigate={onNavigate}
    />
  );
}

function TypeColorDot({ color }: { color: string | null }) {
  return (
    <span
      aria-hidden="true"
      className="block size-2.5 rounded-full"
      style={{ backgroundColor: color ?? "var(--muted-foreground)" }}
    />
  );
}

function ViewAllCollectionsLink({
  collapsed,
  active,
  onNavigate,
}: {
  collapsed: boolean;
  active: boolean;
  onNavigate?: () => void;
}) {
  if (collapsed) return null;
  return (
    <Link
      href="/collections"
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "mt-1 flex h-7 items-center gap-1 rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
        active && "bg-sidebar-accent text-foreground",
      )}
    >
      <span>View all collections</span>
      <ChevronRight className="size-3.5" />
    </Link>
  );
}

function Count({ value }: { value: number }) {
  return (
    <span className="text-xs tabular-nums text-muted-foreground">{value}</span>
  );
}

function ProBadge() {
  return (
    <Badge
      variant="secondary"
      className="h-4 px-1.5 text-[9px] font-semibold tracking-wider text-muted-foreground"
    >
      PRO
    </Badge>
  );
}

function SidebarUser({ collapsed }: { collapsed: boolean }) {
  const initials = mockUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (collapsed) {
    return (
      <div className="flex items-center justify-center p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar size="sm">
              {mockUser.image && (
                <AvatarImage src={mockUser.image} alt={mockUser.name} />
              )}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="right">{mockUser.name}</TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-2">
      <Avatar size="sm">
        {mockUser.image && (
          <AvatarImage src={mockUser.image} alt={mockUser.name} />
        )}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{mockUser.name}</div>
        <div className="truncate text-xs text-muted-foreground">
          {mockUser.email}
        </div>
      </div>
      <Button variant="ghost" size="icon-sm" aria-label="Settings">
        <Settings />
      </Button>
    </div>
  );
}
