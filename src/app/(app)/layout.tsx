import { Sidebar } from "@/components/dashboard/sidebar/Sidebar";
import { SidebarProvider } from "@/components/dashboard/sidebar/SidebarContext";
import { TopBar } from "@/components/dashboard/TopBar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen flex-1">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopBar />
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
