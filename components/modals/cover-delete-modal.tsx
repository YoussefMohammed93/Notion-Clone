import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../ui/button";

interface CoverDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: string;
}

export const CoverDeleteModal: React.FC<CoverDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    const promise = onConfirm();
    toast.promise(promise, {
      loading: "Deleting cover image...",
      success: "Cover image removed!",
      error: "Failed to remove cover image.",
    });
    promise.finally(() => {
      setIsDeleting(false);
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <span />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-xl font-semibold">{title}</h2>
        </DialogHeader>
        <p className="text-muted-foreground">{message}</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mt-2 md:mt-0">
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
