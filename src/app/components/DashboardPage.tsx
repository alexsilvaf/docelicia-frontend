import { Package, AlertTriangle, DollarSign, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { KpiCard } from "./KpiCard";
import { AlertsPanel } from "./AlertsPanel";
import { products, alerts, weeklyConsumption, monthlyRestock, categoryDistribution } from "../data/mock-data";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const totalItems = products.length;
  const lowStock = products.filter((p) => p.currentStock <= p.minStock).length;
  const totalValue = products.reduce((sum, p) => sum + p.currentStock * p.costPerUnit, 0);
  const avgUtilization = Math.round(
    (products.reduce((sum, p) => sum + (p.currentStock / p.maxStock) * 100, 0)) / products.length
  );

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral do estoque - 17 de março de 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8">
        <KpiCard
          label="Total de Produtos"
          value={totalItems}
          delta={8}
          deltaLabel="vs mês anterior"
          icon={<Package className="w-5 h-5" />}
          sparkline={[8, 9, 10, 10, 11, 12]}
        />
        <KpiCard
          label="Itens em Alerta"
          value={lowStock}
          delta={-25}
          deltaLabel="vs semana passada"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <KpiCard
          label="Valor em Estoque"
          value={`R$ ${totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`}
          delta={12}
          deltaLabel="vs mês anterior"
          icon={<DollarSign className="w-5 h-5" />}
          sparkline={[2800, 3200, 4100, 2600, 3000, 3450]}
        />
        <KpiCard
          label="Utilização Média"
          value={`${avgUtilization}%`}
          delta={5}
          deltaLabel="vs semana passada"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Section: Operacional */}
      <div className="mb-6">
        <h3 className="text-foreground mb-3 sm:mb-4">Operacional</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Consumo Semanal */}
          <div className="bg-card border border-border rounded-lg p-3 sm:p-5 shadow-elevation-sm">
            <h4 className="text-card-foreground mb-3 sm:mb-4">Consumo Semanal (R$)</h4>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={weeklyConsumption}>
                <defs>
                  <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} width={40} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                  labelStyle={{ color: "var(--card-foreground)" }}
                  formatter={(value: number) => [`R$ ${value}`, "Consumo"]}
                />
                <Area type="monotone" dataKey="consumo" stroke="var(--chart-1)" strokeWidth={2} fill="url(#colorConsumo)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Investimento Mensal em Reposição */}
          <div className="bg-card border border-border rounded-lg p-3 sm:p-5 shadow-elevation-sm">
            <h4 className="text-card-foreground mb-3 sm:mb-4">Reposição Mensal (R$)</h4>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={monthlyRestock}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} width={40} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                  formatter={(value: number) => [`R$ ${value}`, "Valor"]}
                />
                <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                  {monthlyRestock.map((_, i) => (
                    <Cell key={i} fill={i === monthlyRestock.length - 1 ? "var(--chart-1)" : "var(--chart-2)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section: Detalhamento */}
      <div>
        <h3 className="text-foreground mb-3 sm:mb-4">Detalhamento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Utilização por Categoria */}
          <div className="bg-card border border-border rounded-lg p-3 sm:p-5 shadow-elevation-sm">
            <h4 className="text-card-foreground mb-4">Utilização por Categoria</h4>
            <div className="flex flex-col gap-4">
              {categoryDistribution.map((cat) => {
                const pct = Math.min(100, Math.round((cat.value / (cat.total * 50)) * 100));
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-card-foreground">{cat.name}</label>
                      <label className="text-muted-foreground">{cat.total} itens · {pct}%</label>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alertas */}
          <AlertsPanel alerts={alerts} limit={3} onViewAll={() => onNavigate("alertas")} />
        </div>
      </div>
    </div>
  );
}