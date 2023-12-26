"use client";

import { LoadingSpinner } from "@/components/Loader/LoadingSpinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import SidebarNav from "./_components/SidebarNav";
import { SearchCommand } from "@/components/search-command";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center align-middle">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="h-full flex dark:[#1f1f1f]">
      <SidebarNav />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
