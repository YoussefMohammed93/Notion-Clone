"use client";

import Logo from "./logo";
import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { UseScrollTop } from "@/hooks/use-scroll-top";
import { SignInButton, UserButton } from "@clerk/clerk-react";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = UseScrollTop();

  return (
    <header
      className={cn(
        "w-full fixed top-0 flex items-center px-5 py-3 bg-background dark:bg-[#1f1f1f] z-50",
        scrolled && "border-b shadow-sm dark:border-b-2"
      )}
    >
      <Logo />
      <div className="w-full flex items-center justify-between gap-x-3 md:justify-end md:ml-auto">
        {isLoading && <Spinner size="lg" />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="outline">Login</Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button>Get notion free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};
