"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SidebarContextValue = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

const MOBILE_BREAKPOINT = 768;

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggle = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
    ) {
      setIsMobileOpen((open) => !open);
    } else {
      setIsCollapsed((collapsed) => !collapsed);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(
      `(min-width: ${MOBILE_BREAKPOINT}px)`,
    );
    const handle = () => setIsMobileOpen(false);
    media.addEventListener("change", handle);
    return () => media.removeEventListener("change", handle);
  }, []);

  const value = useMemo<SidebarContextValue>(
    () => ({
      isCollapsed,
      isMobileOpen,
      setMobileOpen: setIsMobileOpen,
      toggle,
    }),
    [isCollapsed, isMobileOpen, toggle],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return ctx;
}
