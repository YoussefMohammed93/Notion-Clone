"use client";

import Link from "next/link";
import Image from "next/image";
import { Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col space-y-5">
      <div className="relative w-[320px] h-[200px] sm:w-[350px] sm:h-[250px] md:w-[500px] md:h-[350px]">
        <Image
          fill
          alt="team-works"
          loading="eager"
          src="/error.png"
          className="object-cover block dark:hidden"
          sizes="(max-width: 640px) 320px, (max-width: 768px) 350px, 500px"
        />
        <Image
          fill
          alt="team-works"
          loading="eager"
          src="/error-dark.png"
          className="object-cover hidden dark:block"
          sizes="(max-width: 640px) 320px, (max-width: 768px) 350px, 500px"
        />
      </div>
      <h2 className="text-xl font-medium text-muted-foreground">
        Something went wrong, It seems that this page has been deleted!
      </h2>
      <Button asChild>
        <Link href="/documents">
          Go back <Undo2 className="size-5" />
        </Link>
      </Button>
    </div>
  );
};

export default Error;
