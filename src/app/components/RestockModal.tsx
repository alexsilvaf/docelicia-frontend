import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import type { Product } from "../data/mock-data";

interface RestockModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

/**
 * Krug: Progressive disclosure — simple modal for a single action.
 * Smart default pre-fills the quantity needed to reach max.
 * Visual feedback shows what happens before confirming.
 */
export function RestockModal({ open, onClose, product }: RestockModalProps) {
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (product && open) {
      // Smart default: suggest the amount to reach max stock
      setQuantity(String(product.maxStock - product.currentStock));
    }
  }, [product, open]);

  if (!product) return null;

  const qty = Number(quantity) || 0;
  const newStock = product.currentStock + qty;
  const overMax = newStock > product.maxStock;
  const cost = qty * product.costPerUnit;

  const handleSubmit = () => {
    if (qty <= 0) return;
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Reabastecer Estoque"
      subtitle={product.name}
      size="sm"
    >
      <div className="flex flex-col gap-4">
        {/* Current state — context at a glance */}
        <div className="bg-muted/50 rounded-lg p-3 flex items-center justify-between">
          <div>
            <label className="text-muted-foreground">Estoque atual</label>
            <p className="text-card-foreground">{product.currentStock} {product.unit}</p>
          </div>
          <div className="text-right">
            <label className="text-muted-foreground">Capacidade</label>
            <p className="text-card-foreground">{product.maxStock} {product.unit}</p>
          </div>
        </div>

        {/* Quantity — one field, the only decision */}
        <div>
          <label className="text-card-foreground block mb-1.5">
            Quantidade a adicionar ({product.unit})
          </label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={`w-full border rounded-md px-3 py-2.5 bg-input-background text-foreground outline-none transition-colors ${
              overMax ? "border-chart-4 ring-1 ring-chart-4/30" : "border-border focus:border-ring focus:ring-1 focus:ring-ring/30"
            }`}
          />
        </div>

        {/* Live preview — don't make them do mental math */}
        {qty > 0 && (
          <div className="bg-muted/50 rounded-lg p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-muted-foreground">Novo estoque</label>
              <p className={`text-card-foreground ${overMax ? "text-chart-4" : ""}`}>
                {newStock} {product.unit}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-muted-foreground">Custo estimado</label>
              <p className="text-card-foreground">R$ {cost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
            </div>
            {/* Visual bar */}
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${overMax ? "bg-chart-4" : "bg-primary"}`}
                style={{ width: `${Math.min(100, (newStock / product.maxStock) * 100)}%` }}
              />
            </div>
            {overMax && (
              <label className="text-chart-4 block">Acima da capacidade máxima</label>
            )}
          </div>
        )}

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
            disabled={qty <= 0}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-button cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Reabastecimento
          </button>
        </div>
      </div>
    </Modal>
  );
}
