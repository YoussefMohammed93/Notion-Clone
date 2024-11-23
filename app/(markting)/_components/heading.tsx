"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-5">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to <br />
        <span className="underline"> Notion </span>
      </h1>
      <h2 className="text-base sm:text-xl md:text-2xl font-medium text-muted-foreground">
        Notion is the connected workspace where <br />
        better, faster work happens.
      </h2>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button variant="default" size="lg" asChild>
          <Link href="/documents">
            Enter Notion
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button variant="default">
            Get notion free
            <ArrowRight className="size-4" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
