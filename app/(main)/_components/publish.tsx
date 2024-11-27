"use client";


import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useMutation } from "convex/react";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { UseOrigin } from "@/hooks/use-origin";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";

interface PublishProps {
  initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = UseOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      success: "Note published!",
      loading: "Publishing note...",
      error: "Failed to publish note.",
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      success: "Note unpublished!",
      loading: "Unpublishing note...",
      error: "Failed to unpublish note.",
    });
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      toast.success("Link copied!");

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy the link.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" className="text-sm" variant="default">
          Publish
          {initialData.isPublished && <Globe className="size-5" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent forceMount align="end" alignOffset={8} className="w-72">
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-blue-600 dark:text-slate-300 animate-pulse size-5" />
              <p className="text-sm font-medium text-blue-600 dark:text-slate-300 mt-0.5">
                This note is live on the web.
              </p>
            </div>
            <div className="flex items-center">
              <Input
                disabled
                value={url}
                className="flex-1 px-2 texs-xs border rounded-l-md h-8 bg-muted truncate"
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="size-5" />
                ) : (
                  <Copy className="size-5" />
                )}
              </Button>
            </div>
            <Button
              onClick={onUnPublish}
              disabled={isSubmitting}
              className="w-full text-sm"
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="size-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              size="sm"
              onClick={onPublish}
              disabled={isSubmitting}
              className="w-full text-sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
