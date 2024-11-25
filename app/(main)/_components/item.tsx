"use client";

import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps {
  label: string;
  level?: number;
  icon: LucideIcon;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  onClick: () => void;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onExpand,
  expanded,
  level = 0,
  icon: Icon,
  documentIcon,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

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
          onClick={() => {}}
          className="h-full rounded-sm dark:bg-neutral-600 hover:bg-neutral-300 mr-1"
        >
          <ChevronIcon className="size-4 shrink-0 text-muted-foreground/50" />
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
        <kbd className="inline-flex items-center gap-1 rounded h-6 text-[10px] ml-auto pointer-events-none select-none px-1.5 border bg-muted font-mono font-medium text-muted-foreground opacity-100">
          <span className="text-xs">Shift + K</span>
        </kbd>
      )}
    </div>
  );
};
