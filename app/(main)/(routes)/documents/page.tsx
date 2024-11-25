"use client";

import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      success: "New note created!",
      loading: "Creating a new note...",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-5">
      <div className="relative w-[280px] h-[275px] sm:w-[350px] sm:h-[335px] md:w-[400px] md:h-[400px]">
        <Image
          fill
          loading="eager"
          src="/main.svg"
          className="object-cover block dark:hidden"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, 400px"
          alt="main"
        />
        <Image
          fill
          loading="eager"
          src="/main-dark.svg"
          className="object-cover hidden dark:block"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, 400px"
          alt="main"
        />
      </div>
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName} &apos;s notion
      </h2>
      <Button size="lg" onClick={onCreate}>
        <PlusCircle className="size-4" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
