"use client";
import AppSidebar from "@/components/AppSidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar();
  return (
    <>
      <AppSidebar />
      <div className="max-w-full w-full overflow-hidden p-4 pl-0">
        <div className="w-full h-full rounded-2xl p-2 monitor-border bg-monitor">
          {open ? (
            children
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
