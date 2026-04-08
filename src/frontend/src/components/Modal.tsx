/**
 * Modal — accessible confirmation dialog used for destructive actions
 * (e.g., delete review).
 *
 * Built on top of shadcn/ui AlertDialog for keyboard trap and focus management.
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** Label for the confirm button (default: "Confirm") */
  confirmLabel?: string;
  /** Shows the confirm button as destructive (red) */
  destructive?: boolean;
  /** Called when the user confirms the action */
  onConfirm: () => void;
  /** Disable confirm while a mutation is in-flight */
  loading?: boolean;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  destructive = false,
  onConfirm,
  loading = false,
}: ModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent data-ocid="modal-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-ocid="modal-cancel" disabled={loading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={loading}
            className={
              destructive
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : undefined
            }
            data-ocid="modal-confirm"
          >
            {loading ? "Processing…" : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Modal;
