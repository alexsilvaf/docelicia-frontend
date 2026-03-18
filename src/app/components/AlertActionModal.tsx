import { useState } from "react";
import { AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Modal } from "./Modal";
import type { Alert } from "../data/mock-data";

interface AlertActionModalProps {
  open: boolean;
  onClose: () => void;
  alert: Alert | null;
}

const severityConfig = {
  critical: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
  warning: { icon: AlertTriangle, color: "text-chart-4", bg: "bg-chart-4/10" },
  info: { icon: Info, color: "text-chart-2", bg: "bg-chart-2/10" },
};

/**
 * Krug: Don't make users think about what to do next.
 * Show clear context, suggest the obvious action,
 * optional note for audit trail.
 */
export function AlertActionModal({ open, onClose, alert }: AlertActionModalProps) {
  const [action, setAction] = useState<"resolve" | "dismiss">("resolve");
  const [note, setNote] = useState("");

  if (!alert) return null;

  const config = severityConfig[alert.severity];
  const Icon = config.icon;
  const severityLabels = { critical: "Crítico", warning: "Atenção", info: "Informativo" };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Resolver Alerta" size="sm">
      <div className="flex flex-col gap-4">
        {/* Alert context — what are we acting on */}
        <div className={`${config.bg} rounded-lg p-4 flex items-start gap-3`}>
          <Icon className={`w-6 h-6 shrink-0 mt-0.5 ${config.color}`} />
          <div>
            <p className="text-card-foreground">{alert.product}</p>
            <label className="text-muted-foreground">{alert.message}</label>
            <div className="mt-1">
              <label className={`${config.color}`}>{severityLabels[alert.severity]}</label>
              <label className="text-muted-foreground"> · {new Date(alert.timestamp).toLocaleDateString("pt-BR")}</label>
            </div>
          </div>
        </div>

        {/* Action choice — two clear options, default pre-selected */}
        <div>
          <label className="text-card-foreground block mb-2">O que deseja fazer?</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setAction("resolve")}
              className={`flex items-center justify-center gap-2 p-3 rounded-md border cursor-pointer transition-colors ${
                action === "resolve"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Resolver</span>
            </button>
            <button
              onClick={() => setAction("dismiss")}
              className={`flex items-center justify-center gap-2 p-3 rounded-md border cursor-pointer transition-colors ${
                action === "dismiss"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Dispensar</span>
            </button>
          </div>
        </div>

        {/* Optional note — progressive disclosure, not required */}
        <div>
          <label className="text-card-foreground block mb-1.5">
            Observação <span className="text-muted-foreground">(opcional)</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ex: Pedido de reposição feito com fornecedor"
            rows={2}
            className="w-full border border-border rounded-md px-3 py-2.5 bg-input-background text-foreground outline-none resize-none focus:border-ring focus:ring-1 focus:ring-ring/30 transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t border-border">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-button cursor-pointer text-muted-foreground hover:bg-muted transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-button cursor-pointer hover:opacity-90 transition-opacity"
          >
            {action === "resolve" ? "Marcar como Resolvido" : "Dispensar Alerta"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
