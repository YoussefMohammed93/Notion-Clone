"use client";

import { useRef, useState } from "react";
import { SquarePen } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

interface TitleProps {
  initialData: Doc<"documents">;
}

export const Title = ({ initialData }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.update);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "Untitled");

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    update({
      id: initialData._id,
      title: e.target.value || "Untitled",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-x-3">
      {!!initialData?.icon && <p className="text-xl">{initialData?.icon}</p>}
      {isEditing ? (
        <Input
          value={title}
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          onChange={onChange}
          className="px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={enableInput}
          className="px-3 py-2 text-base"
        >
          <span className="truncate">{initialData?.title}</span>
          <SquarePen className="size-5" />
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="w-28 h-6 rounded-sm bg-primary/10" />;
};
