"use client";

import Logo from "./logo";
import { cn } from "@/lib/utils";
import { UseScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const scrolled = UseScrollTop();

  return (
    <header
      className={cn(
        "w-full fixed top-0 flex items-center px-5 py-2 bg-background dark:bg-[#1f1f1f] z-50",
        scrolled && "border-b dark:border-none shadow-sm dark:shadow-none"
      )}
    >
      <Logo />
      <div className="w-full flex items-center justify-between gap-x-2 md:justify-end md:ml-auto">
        <ModeToggle />
      </div>
    </header>
  );
};
