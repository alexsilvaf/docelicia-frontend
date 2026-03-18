import { useState } from "react";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import type { Alert } from "../data/mock-data";
import { AlertActionModal } from "./AlertActionModal";

interface AlertsPanelProps {
  alerts: Alert[];
  limit?: number;
  onViewAll?: () => void;
}

const severityConfig = {
  critical: { icon: AlertCircle, bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/30" },
  warning: { icon: AlertTriangle, bg: "bg-chart-4/10", text: "text-chart-4", border: "border-chart-4/30" },
  info: { icon: Info, bg: "bg-chart-2/10", text: "text-chart-2", border: "border-chart-2/30" },
};

export function AlertsPanel({ alerts, limit, onViewAll }: AlertsPanelProps) {
  const displayed = limit ? alerts.slice(0, limit) : alerts;
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  return (
    <div className="bg-card border border-border rounded-lg p-3 sm:p-5 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-card-foreground">Alertas</h3>
        {onViewAll && (
          <button onClick={onViewAll} className="text-primary cursor-pointer hover:underline">
            <label className="text-primary cursor-pointer">Ver todos</label>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {displayed.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <button
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className={`flex items-start gap-3 p-3 rounded-md border ${config.bg} ${config.border} w-full text-left cursor-pointer hover:opacity-80 transition-opacity`}
            >
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.text}`} />
              <div className="flex-1 min-w-0">
                <p className="text-card-foreground">{alert.product}</p>
                <label className="text-muted-foreground">{alert.message}</label>
              </div>
              <label className="text-muted-foreground shrink-0">
                {new Date(alert.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </label>
            </button>
          );
        })}
      </div>

      <AlertActionModal
        open={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
        alert={selectedAlert}
      />
    </div>
  );
}
