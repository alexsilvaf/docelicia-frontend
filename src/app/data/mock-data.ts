export interface Product {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  costPerUnit: number;
  lastRestocked: string;
}

export interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  message: string;
  product: string;
  timestamp: string;
}

export const products: Product[] = [
  { id: "1", name: "Café em grão", category: "Bebidas", currentStock: 8, minStock: 10, maxStock: 50, unit: "kg", costPerUnit: 42, lastRestocked: "2026-03-10" },
  { id: "2", name: "Leite integral", category: "Bebidas", currentStock: 25, minStock: 15, maxStock: 60, unit: "L", costPerUnit: 6.5, lastRestocked: "2026-03-15" },
  { id: "3", name: "Chocolate em pó", category: "Ingredientes", currentStock: 3, minStock: 5, maxStock: 20, unit: "kg", costPerUnit: 28, lastRestocked: "2026-03-01" },
  { id: "4", name: "Farinha de trigo", category: "Ingredientes", currentStock: 30, minStock: 10, maxStock: 50, unit: "kg", costPerUnit: 5.8, lastRestocked: "2026-03-12" },
  { id: "5", name: "Açúcar refinado", category: "Ingredientes", currentStock: 18, minStock: 8, maxStock: 40, unit: "kg", costPerUnit: 4.2, lastRestocked: "2026-03-14" },
  { id: "6", name: "Manteiga", category: "Ingredientes", currentStock: 6, minStock: 5, maxStock: 25, unit: "kg", costPerUnit: 35, lastRestocked: "2026-03-08" },
  { id: "7", name: "Ovos", category: "Ingredientes", currentStock: 120, minStock: 60, maxStock: 300, unit: "un", costPerUnit: 0.8, lastRestocked: "2026-03-16" },
  { id: "8", name: "Creme de leite", category: "Ingredientes", currentStock: 12, minStock: 8, maxStock: 30, unit: "L", costPerUnit: 9.5, lastRestocked: "2026-03-13" },
  { id: "9", name: "Essência de baunilha", category: "Ingredientes", currentStock: 2, minStock: 3, maxStock: 10, unit: "L", costPerUnit: 65, lastRestocked: "2026-02-20" },
  { id: "10", name: "Copos descartáveis", category: "Descartáveis", currentStock: 350, minStock: 200, maxStock: 1000, unit: "un", costPerUnit: 0.15, lastRestocked: "2026-03-11" },
  { id: "11", name: "Guardanapos", category: "Descartáveis", currentStock: 800, minStock: 500, maxStock: 2000, unit: "un", costPerUnit: 0.03, lastRestocked: "2026-03-09" },
  { id: "12", name: "Leite condensado", category: "Ingredientes", currentStock: 15, minStock: 10, maxStock: 40, unit: "un", costPerUnit: 7.9, lastRestocked: "2026-03-14" },
];

export const alerts: Alert[] = [
  { id: "a1", severity: "critical", message: "Estoque abaixo do mínimo", product: "Chocolate em pó", timestamp: "2026-03-17T08:30:00" },
  { id: "a2", severity: "critical", message: "Estoque abaixo do mínimo", product: "Essência de baunilha", timestamp: "2026-03-17T08:30:00" },
  { id: "a3", severity: "warning", message: "Estoque abaixo do mínimo", product: "Café em grão", timestamp: "2026-03-17T08:30:00" },
  { id: "a4", severity: "info", message: "Reabastecimento realizado", product: "Ovos", timestamp: "2026-03-16T14:00:00" },
  { id: "a5", severity: "info", message: "Reabastecimento realizado", product: "Leite integral", timestamp: "2026-03-15T10:00:00" },
];

export const weeklyConsumption = [
  { day: "Seg", consumo: 0 },
  { day: "Ter", consumo: 1850 },
  { day: "Qua", consumo: 2100 },
  { day: "Qui", consumo: 1920 },
  { day: "Sex", consumo: 2340 },
  { day: "Sáb", consumo: 2800 },
  { day: "Dom", consumo: 0 },
];

export const categoryDistribution = [
  { name: "Bebidas", value: 33, total: 2 },
  { name: "Ingredientes", value: 206, total: 8 },
  { name: "Descartáveis", value: 1150, total: 2 },
];

export const monthlyRestock = [
  { month: "Out", valor: 2800 },
  { month: "Nov", valor: 3200 },
  { month: "Dez", valor: 4100 },
  { month: "Jan", valor: 2600 },
  { month: "Fev", valor: 3000 },
  { month: "Mar", valor: 3450 },
];
