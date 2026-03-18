import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { products, categoryDistribution, monthlyRestock } from "../data/mock-data";

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

export function RelatoriosPage() {
  const topByValue = [...products]
    .map((p) => ({ name: p.name, valor: p.currentStock * p.costPerUnit }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 6);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
      <div className="mb-6 lg:mb-8">
        <h2 className="text-foreground">Relatórios</h2>
        <p className="text-muted-foreground">Análises detalhadas do estoque</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Top produtos por valor */}
        <div className="bg-card border border-border rounded-lg p-3 sm:p-5 shadow-elevation-sm">
          <h4 className="text-card-foreground mb-3 sm:mb-4">Top Produtos por Valor em Estoque</h4>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topByValue} layout="vertical">
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} width={100} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Valor"]}
              />
              <Bar dataKey="valor" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribuição por categoria */}
        <div className="bg-card border border-border rounded-lg p-3 sm:p-5 shadow-elevation-sm">
          <h4 className="text-card-foreground mb-3 sm:mb-4">Distribuição por Categoria</h4>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Evolução de custos */}
        <div className="bg-card border border-border rounded-lg p-3 sm:p-5 shadow-elevation-sm md:col-span-2">
          <h4 className="text-card-foreground mb-3 sm:mb-4">Evolução de Custos de Reposição</h4>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyRestock}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                formatter={(value: number) => [`R$ ${value}`, "Valor"]}
              />
              <Bar dataKey="valor" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}