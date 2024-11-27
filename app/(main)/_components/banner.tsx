"use client";

import { toast } from "sonner";
import { useMutation } from "convex/react";
import { Trash, Undo } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({
      id: documentId,
    });

    toast.promise(promise, {
      success: "Note deleted!",
      loading: "Deleting note...",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({
      id: documentId,
    });

    toast.promise(promise, {
      success: "Note restored!",
      loading: "Restoring note...",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2 p-2 text-center text-sm text-white bg-destructive">
      <p className="text-lg md:text-base md:font-mono">
        This note is in the Trash.
      </p>
      <div className="flex items-center gap-x-2">
        <Button
          onClick={onRestore}
          variant="secondary"
          className="hover:bg-white"
        >
          Restore note <Undo />
        </Button>
        <ConfirmModal onConfirm={onRemove}>
          <Button variant="secondary" className="hover:bg-white">
            Delete note <Trash />
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};
