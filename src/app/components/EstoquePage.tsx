import { useState } from "react";
import { Search, Filter, Plus, ArrowUpDown, RefreshCw, Pencil, Trash2 } from "lucide-react";
import { products, type Product } from "../data/mock-data";
import { ProductFormModal } from "./ProductFormModal";
import { RestockModal } from "./RestockModal";
import { ConfirmModal } from "./ConfirmModal";

export function EstoquePage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [sortField, setSortField] = useState<"name" | "currentStock">("name");
  const [sortAsc, setSortAsc] = useState(true);

  // Modal states
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [restockProduct, setRestockProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const categories = [...new Set(products.map((p) => p.category))];
  const categoryOptions = ["Todos", ...categories];

  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => categoryFilter === "Todos" || p.category === categoryFilter)
    .sort((a, b) => {
      const mul = sortAsc ? 1 : -1;
      if (sortField === "name") return a.name.localeCompare(b.name) * mul;
      return (a.currentStock - b.currentStock) * mul;
    });

  const toggleSort = (field: "name" | "currentStock") => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const getStockStatus = (current: number, min: number, max: number) => {
    if (current <= min) return { label: "Crítico", color: "bg-destructive text-destructive-foreground" };
    if (current <= min * 1.5) return { label: "Baixo", color: "bg-chart-4 text-foreground" };
    if (current >= max * 0.9) return { label: "Cheio", color: "bg-chart-2 text-chart-2" };
    return { label: "Normal", color: "bg-primary text-primary-foreground" };
  };

  const openEdit = (p: Product) => { setEditProduct(p); setProductModalOpen(true); };
  const openAdd = () => { setEditProduct(null); setProductModalOpen(true); };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h2 className="text-foreground">Estoque</h2>
          <p className="text-muted-foreground">{products.length} produtos cadastrados</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-button cursor-pointer hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Produto</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-card border border-border rounded-md px-3 py-2 w-full sm:max-w-sm">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none flex-1 min-w-0 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-button cursor-pointer transition-colors whitespace-nowrap ${
                categoryFilter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              <label className={`cursor-pointer ${categoryFilter === cat ? "text-primary-foreground" : "text-muted-foreground"}`}>{cat}</label>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-card border border-border rounded-lg overflow-hidden shadow-elevation-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 cursor-pointer" onClick={() => toggleSort("name")}>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <label className="text-muted-foreground cursor-pointer">Produto</label>
                    <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
                <th className="text-left px-4 py-3"><label className="text-muted-foreground">Categoria</label></th>
                <th className="text-left px-4 py-3 cursor-pointer" onClick={() => toggleSort("currentStock")}>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <label className="text-muted-foreground cursor-pointer">Estoque</label>
                    <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
                <th className="text-left px-4 py-3"><label className="text-muted-foreground">Utilização</label></th>
                <th className="text-left px-4 py-3"><label className="text-muted-foreground">Status</label></th>
                <th className="text-left px-4 py-3"><label className="text-muted-foreground">Valor</label></th>
                <th className="text-left px-4 py-3"><label className="text-muted-foreground">Ações</label></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const pct = Math.round((p.currentStock / p.maxStock) * 100);
                const status = getStockStatus(p.currentStock, p.minStock, p.maxStock);
                return (
                  <tr key={p.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3"><p className="text-card-foreground">{p.name}</p></td>
                    <td className="px-4 py-3"><label className="text-muted-foreground">{p.category}</label></td>
                    <td className="px-4 py-3">
                      <p className="text-card-foreground">{p.currentStock} {p.unit}</p>
                      <label className="text-muted-foreground">min: {p.minStock} · max: {p.maxStock}</label>
                    </td>
                    <td className="px-4 py-3 w-36">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${pct <= 25 ? "bg-destructive" : pct <= 50 ? "bg-chart-4" : "bg-primary"}`}
                            style={{ width: `${Math.min(100, pct)}%` }}
                          />
                        </div>
                        <label className="text-muted-foreground">{pct}%</label>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-sm ${status.color}`}>
                        <label className="text-inherit cursor-default">{status.label}</label>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-card-foreground">R$ {(p.currentStock * p.costPerUnit).toLocaleString("pt-BR", { minimumFractionDigits: 0 })}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setRestockProduct(p)}
                          title="Reabastecer"
                          className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEdit(p)}
                          title="Editar"
                          className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteProduct(p)}
                          title="Excluir"
                          className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        <div className="flex gap-2 mb-3">
          <button onClick={() => toggleSort("name")} className="flex items-center gap-1 text-muted-foreground cursor-pointer px-2 py-1 rounded-button bg-muted">
            <label className="text-muted-foreground cursor-pointer">Nome</label>
            <ArrowUpDown className="w-3 h-3" />
          </button>
          <button onClick={() => toggleSort("currentStock")} className="flex items-center gap-1 text-muted-foreground cursor-pointer px-2 py-1 rounded-button bg-muted">
            <label className="text-muted-foreground cursor-pointer">Estoque</label>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((p) => {
            const pct = Math.round((p.currentStock / p.maxStock) * 100);
            const status = getStockStatus(p.currentStock, p.minStock, p.maxStock);
            return (
              <div key={p.id} className="bg-card border border-border rounded-lg p-3 shadow-elevation-sm flex flex-col">
                <div className="flex items-start justify-between gap-1 mb-2">
                  <p className="text-card-foreground truncate">{p.name}</p>
                  <span className={`px-1.5 py-0.5 rounded-sm shrink-0 ${status.color}`}>
                    <label className="text-inherit cursor-default">{status.label}</label>
                  </span>
                </div>
                <label className="text-muted-foreground mb-2">{p.category}</label>
                <div className="flex items-baseline justify-between gap-1 mb-1">
                  <p className="text-card-foreground">{p.currentStock} {p.unit}</p>
                  <label className="text-muted-foreground">{pct}%</label>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all ${pct <= 25 ? "bg-destructive" : pct <= 50 ? "bg-chart-4" : "bg-primary"}`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
                {/* Action row */}
                <div className="mt-auto pt-2 border-t border-border flex items-center justify-between">
                  <label className="text-muted-foreground">R$ {(p.currentStock * p.costPerUnit).toLocaleString("pt-BR", { minimumFractionDigits: 0 })}</label>
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => setRestockProduct(p)}
                      className="p-1 rounded-md text-muted-foreground hover:text-primary cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openEdit(p)}
                      className="p-1 rounded-md text-muted-foreground hover:text-primary cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteProduct(p)}
                      className="p-1 rounded-md text-muted-foreground hover:text-destructive cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <ProductFormModal
        open={productModalOpen}
        onClose={() => { setProductModalOpen(false); setEditProduct(null); }}
        product={editProduct}
        existingCategories={categories}
      />
      <RestockModal
        open={!!restockProduct}
        onClose={() => setRestockProduct(null)}
        product={restockProduct}
      />
      <ConfirmModal
        open={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onConfirm={() => setDeleteProduct(null)}
        title="Excluir Produto"
        message={`Tem certeza que deseja excluir "${deleteProduct?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        destructive
      />
    </div>
  );
}
