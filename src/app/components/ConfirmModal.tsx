import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  destructive?: boolean;
}

/**
 * Krug: For irreversible or important actions, make the
 * consequences obvious. Clear question, two clear answers.
 */
export function ConfirmModal({
  open, onClose, onConfirm, title, message, confirmLabel = "Confirmar", destructive = false,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full shrink-0 ${destructive ? "bg-destructive/10" : "bg-primary/10"}`}>
            <AlertTriangle className={`w-5 h-5 ${destructive ? "text-destructive" : "text-primary"}`} />
          </div>
          <p className="text-card-foreground">{message}</p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t border-border">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-button cursor-pointer text-muted-foreground hover:bg-muted transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`px-6 py-2.5 rounded-button cursor-pointer hover:opacity-90 transition-opacity ${
              destructive
                ? "bg-destructive text-destructive-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
