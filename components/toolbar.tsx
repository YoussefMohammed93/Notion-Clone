"use client";

import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { IconPicker } from "./icon-picker";
import { api } from "@/convex/_generated/api";
import { ImageIcon, Smile, X } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { UseCoverImage } from "@/hooks/use-cover-image";

interface ToolbarProps {
  preview?: boolean;
  initialData: Doc<"documents">;
}

export const Toolbar = ({ preview, initialData }: ToolbarProps) => {
  const coverImage = UseCoverImage();
  const update = useMutation(api.documents.update);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [value, setValue] = useState(initialData?.title);
  const removeIcon = useMutation(api.documents.removeIcon);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);

    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      icon,
      id: initialData._id,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <div className="group relative pl-14 pt-20">
      {!!initialData?.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-[4vh]">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            size="icon"
            variant="outline"
            onClick={onRemoveIcon}
            className="rounded-full transition text-xs opacity-0 group-hover/icon:opacity-100 text-muted-foreground"
          >
            <X className="size-5" />
          </Button>
        </div>
      )}
      {!!initialData?.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="flex items-center gap-x-1 py-4 md:opacity-0 md:group-hover:opacity-100">
        {!initialData?.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              size="sm"
              variant="outline"
              className="text-sm text-muted-foreground"
            >
              <Smile className="size-5" />
              <span className="mt-0.5">Add icon</span>
            </Button>
          </IconPicker>
        )}
        {!initialData?.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            size="sm"
            variant="outline"
            className="text-sm text-muted-foreground"
          >
            <ImageIcon className="size-5" />
            <span className="mt-0.5">Add cover</span>
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          value={value}
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none resize-none text-[#3f3f3f] dark:text-[#cfcfcf]"
        />
      ) : (
        <div
          role="button"
          onClick={enableInput}
          className="pb-3 text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-white"
        >
          {initialData?.title}
        </div>
      )}
    </div>
  );
};
