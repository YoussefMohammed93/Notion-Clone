"use client";

import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Navigation from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";
import { useLayoutContext } from "@/components/providers/layout-provider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { isCollapsed } = useLayoutContext();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) return redirect("/");

  return (
    <div
      className={cn(
        "h-full flex dark:bg-[#1f1f1f] absolute overflow-hidden md:relative md:overflow-auto",
        isCollapsed && "relative overflow-auto"
      )}
    >
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
