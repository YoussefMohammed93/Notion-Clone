/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

interface ItemProps {
  label: string;
  level?: number;
  icon: LucideIcon;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  onClick?: () => void;
  id?: Id<"documents">;
  onExpand?: () => void;
  documentIcon?: string;
}

export const Item = ({
  id,
  label,
  active,
  onClick,
  isSearch,
  onExpand,
  expanded,
  level = 0,
  icon: Icon,
  documentIcon,
}: ItemProps) => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      success: "New note created!",
      loading: "Creating a new note...",
      error: "Failed to create a new note.",
    });
  };

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = archive({ id });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
  };

  return (
    <div
      role="button"
      onClick={onClick}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "group w-full min-h-[28px] flex items-center text-sm text-muted-foreground font-medium py-1 pr-3 hover:bg-primary/5",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          onClick={handleExpand}
          className="h-full rounded-sm dark:bg-neutral-600 hover:bg-neutral-300 mr-1"
        >
          <ChevronIcon className="size-5 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <div>
          <Icon className="h-[18px] shrink-0 mr-2 text-muted-foreground" />
        </div>
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="hidden md:inline-flex items-center gap-1 rounded h-6 text-[10px] ml-auto pointer-events-none select-none px-1.5 border bg-muted font-mono font-medium text-muted-foreground opacity-100">
          <span className="text-xs">Shift + K</span>
        </kbd>
      )}
      {!!id && (
        <div
          role="button"
          onClick={onCreate}
          className="flex items-center ml-auto gap-x-2"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="size-5 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              forceMount
              side="right"
              align="start"
              className="w-60"
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="size-5" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div
                className="text-xs text-muted-foreground p-2"
                onClick={(e) => e.stopPropagation()}
              >
                Last edited by : {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
            <Plus className="size-5 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      className="flex gap-x-2 py-[3px]"
      style={{
        paddingLeft: level ? `${level * 20 + 12}px` : "12px",
      }}
    >
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-[30%] h-4" />
    </div>
  );
};
