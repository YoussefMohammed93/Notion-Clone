"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Heading = () => {
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
      <Button variant="default" size="lg">
        Enter Notion
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
};

export default Heading;
