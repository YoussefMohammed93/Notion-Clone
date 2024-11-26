"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { ImageIcon, X } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { UseCoverImage } from "@/hooks/use-cover-image";
import { CoverDeleteModal } from "./modals/cover-delete-modal";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const CoverImage = ({ url, preview }: CoverImageProps) => {
  const params = useParams();
  const coverImage = UseCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onRemove = async (): Promise<void> => {
    await removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "w-full relative h-[35vh] group",
        !url && "h-[8vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} alt="Cover" fill className="object-cover" />}
      {url && !preview && (
        <div className="flex items-center gap-x-3 absolute bottom-5 right-5 opacity-0 group-hover:opacity-100">
          <Button
            size="sm"
            variant="outline"
            onClick={coverImage.onOpen}
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="size-5" />
            Change cover
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
            className="text-xs text-muted-foreground"
          >
            <X className="size-5" />
            Remove cover
          </Button>
        </div>
      )}
      <CoverDeleteModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={onRemove}
        title="Remove cover image"
        message="Are you sure you want to remove the cover image?"
      />
    </div>
  );
};
