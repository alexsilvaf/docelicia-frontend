import { alerts } from "../data/mock-data";
import { AlertsPanel } from "./AlertsPanel";

export function AlertasPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
      <div className="mb-6 lg:mb-8">
        <h2 className="text-foreground">Alertas</h2>
        <p className="text-muted-foreground">Todos os alertas do sistema</p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 lg:mb-8">
        {(["critical", "warning", "info"] as const).map((severity) => {
          const count = alerts.filter((a) => a.severity === severity).length;
          const labels = { critical: "Críticos", warning: "Atenção", info: "Informativos" };
          const colors = { critical: "text-destructive", warning: "text-chart-4", info: "text-chart-2" };
          return (
            <div key={severity} className="bg-card border border-border rounded-lg p-3 sm:p-5 shadow-elevation-sm text-center">
              <label className="text-muted-foreground">{labels[severity]}</label>
              <h2 className={colors[severity]}>{count}</h2>
            </div>
          );
        })}
      </div>

      <AlertsPanel alerts={alerts} />
    </div>
  );
}