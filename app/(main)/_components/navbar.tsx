"use client";

import { Title } from "./title";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined || document === null) {
    return (
      <nav className="w-full flex items-center gap-x-4 bg-background dark:bg-[#1f1f1f] px-3 py-2">
        <Title.Skeleton />
      </nav>
    );
  }

  return (
    <nav className="w-full flex items-center gap-x-4 bg-background dark:bg-[#1f1f1f] px-3 py-2">
      {isCollapsed && (
        <MenuIcon
          role="button"
          onClick={onResetWidth}
          className="size-6 text-muted-foreground"
        />
      )}
      <div className="w-full flex items-center justify-between">
        <Title initialData={document} />
      </div>
    </nav>
  );
};
