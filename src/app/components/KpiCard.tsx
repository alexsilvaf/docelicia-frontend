import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  icon?: ReactNode;
  sparkline?: number[];
}

export function KpiCard({ label, value, delta, deltaLabel, icon, sparkline }: KpiCardProps) {
  const deltaColor = delta === undefined ? "" : delta > 0 ? "text-chart-2" : delta < 0 ? "text-destructive" : "text-muted-foreground";
  const DeltaIcon = delta === undefined ? null : delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;

  return (
    <div className="bg-card border border-border rounded-lg p-3 sm:p-5 shadow-elevation-sm flex flex-col gap-1 sm:gap-2">
      <div className="flex items-center justify-between">
        <label className="text-muted-foreground truncate">{label}</label>
        {icon && <span className="text-primary shrink-0">{icon}</span>}
      </div>
      <h3 className="text-card-foreground sm:hidden">{value}</h3>
      <h2 className="text-card-foreground hidden sm:block">{value}</h2>
      <div className="flex items-center justify-between gap-1">
        {delta !== undefined && DeltaIcon && (
          <span className={`flex items-center gap-1 ${deltaColor}`}>
            <DeltaIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <label className={deltaColor}>{delta > 0 ? "+" : ""}{delta}%</label>
            {deltaLabel && <label className="text-muted-foreground ml-1 hidden sm:inline">{deltaLabel}</label>}
          </span>
        )}
        {sparkline && (
          <svg viewBox="0 0 80 24" className="w-16 h-5 sm:w-20 sm:h-6 shrink-0" fill="none">
            <polyline
              points={sparkline.map((v, i) => `${(i / (sparkline.length - 1)) * 80},${24 - (v / Math.max(...sparkline)) * 20}`).join(" ")}
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}