import { getSidebarCollections } from "@/lib/db/collections";
import { getSidebarItemTypes } from "@/lib/db/items";

import { SidebarShell } from "./SidebarShell";

export async function Sidebar() {
  const [itemTypes, collections] = await Promise.all([
    getSidebarItemTypes(),
    getSidebarCollections(),
  ]);

  return <SidebarShell itemTypes={itemTypes} collections={collections} />;
}
