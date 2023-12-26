"use client";

import React from "react";
import { useScroll } from "@/hooks/UseScroll";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/toggle-theme";
import { LoadingSpinner } from "@/components/Loader/LoadingSpinner";

const NavBar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScroll();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && (
          <p>
            <LoadingSpinner size="lg" />
          </p>
        )}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Noiton-clone free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
