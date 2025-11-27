"use client";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      style={{
        // @ts-ignore
        "--sidebar-width": "17rem",
      }}
    >
      <AppSidebar />
      <div className="max-w-full w-full overflow-hidden p-4 pl-0">
        <div className="w-full h-full rounded-2xl p-2 monitor-border bg-[#121212]">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
