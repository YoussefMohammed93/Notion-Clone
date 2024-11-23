"use client";

import Logo from "./logo";
import Link from "next/link";
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
        scrolled && "border-b dark:border-none shadow-sm dark:shadow-none"
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
            <Button variant="outline" asChild>
              <Link href="/documents">Enter notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};
