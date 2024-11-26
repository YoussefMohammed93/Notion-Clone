"use client";

import { Menu } from "./menu";
import { Title } from "./title";
import { Banner } from "./banner";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

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
      <nav className="w-full flex items-center justify-between gap-x-4 bg-background dark:bg-[#1f1f1f] px-3 py-2">
        <div className="flex gap-x-3">
          <Skeleton className="size-6 rounded-sm bg-primary/10" />
          <Title.Skeleton />
        </div>
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  return (
    <>
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
          <div className="flex items-center gap-x-2">
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};
