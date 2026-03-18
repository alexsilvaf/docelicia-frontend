import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import type { Product } from "../data/mock-data";

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
  existingCategories: string[];
}

/**
 * Krug: Single-column form, labels above inputs, smart defaults,
 * one obvious primary action, inline hints, minimal required fields.
 */
export function ProductFormModal({ open, onClose, product, existingCategories }: ProductFormModalProps) {
  const isEdit = !!product;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("kg");
  const [currentStock, setCurrentStock] = useState("");
  const [minStock, setMinStock] = useState("");
  const [maxStock, setMaxStock] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill on edit
  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setUnit(product.unit);
      setCurrentStock(String(product.currentStock));
      setMinStock(String(product.minStock));
      setMaxStock(String(product.maxStock));
      setCostPerUnit(String(product.costPerUnit));
    } else {
      setName(""); setCategory(existingCategories[0] || ""); setUnit("kg");
      setCurrentStock(""); setMinStock(""); setMaxStock(""); setCostPerUnit("");
    }
    setErrors({});
  }, [product, open, existingCategories]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Dê um nome ao produto";
    if (!category.trim()) e.category = "Escolha uma categoria";
    if (!currentStock || Number(currentStock) < 0) e.currentStock = "Informe a quantidade atual";
    if (!minStock || Number(minStock) < 0) e.minStock = "Defina o mínimo";
    if (!maxStock || Number(maxStock) <= 0) e.maxStock = "Defina o máximo";
    if (Number(minStock) >= Number(maxStock)) e.maxStock = "Máximo deve ser maior que o mínimo";
    if (!costPerUnit || Number(costPerUnit) <= 0) e.costPerUnit = "Informe o custo";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // Mock save — in real app, persist here
    onClose();
  };

  const fieldClass = (field: string) =>
    `w-full border rounded-md px-3 py-2.5 bg-input-background text-foreground transition-colors outline-none
     ${errors[field] ? "border-destructive ring-1 ring-destructive/30" : "border-border focus:border-ring focus:ring-1 focus:ring-ring/30"}`;

  const units = ["kg", "g", "L", "mL", "un"];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? `Editar ${product?.name}` : "Novo Produto"}
      subtitle={isEdit ? "Atualize as informações abaixo" : "Preencha os dados do produto"}
    >
      <div className="flex flex-col gap-5">
        {/* Name — most important, comes first */}
        <div>
          <label className="text-card-foreground block mb-1.5">
            Nome do produto <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
            placeholder="Ex: Café em grão"
            className={fieldClass("name")}
          />
          {errors.name && <label className="text-destructive mt-1 block">{errors.name}</label>}
        </div>

        {/* Category + Unit — side by side, related */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-card-foreground block mb-1.5">
              Categoria <span className="text-destructive">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setErrors((p) => ({ ...p, category: "" })); }}
              className={fieldClass("category")}
            >
              <option value="">Selecionar...</option>
              {existingCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="__new">+ Nova categoria</option>
            </select>
            {category === "__new" && (
              <input
                type="text"
                placeholder="Nome da nova categoria"
                onChange={(e) => setCategory(e.target.value)}
                className={`${fieldClass("category")} mt-2`}
              />
            )}
            {errors.category && <label className="text-destructive mt-1 block">{errors.category}</label>}
          </div>
          <div>
            <label className="text-card-foreground block mb-1.5">Unidade</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={fieldClass("unit")}
            >
              {units.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        {/* Stock levels — grouped as a visual unit */}
        <fieldset className="border border-border rounded-lg p-4">
          <legend className="px-2 text-muted-foreground">Níveis de estoque</legend>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-card-foreground block mb-1.5">
                Atual <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                min={0}
                value={currentStock}
                onChange={(e) => { setCurrentStock(e.target.value); setErrors((p) => ({ ...p, currentStock: "" })); }}
                placeholder="0"
                className={fieldClass("currentStock")}
              />
              {errors.currentStock && <label className="text-destructive mt-1 block">{errors.currentStock}</label>}
            </div>
            <div>
              <label className="text-card-foreground block mb-1.5">
                Mínimo <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                min={0}
                value={minStock}
                onChange={(e) => { setMinStock(e.target.value); setErrors((p) => ({ ...p, minStock: "" })); }}
                placeholder="0"
                className={fieldClass("minStock")}
              />
              {errors.minStock && <label className="text-destructive mt-1 block">{errors.minStock}</label>}
            </div>
            <div>
              <label className="text-card-foreground block mb-1.5">
                Máximo <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                min={1}
                value={maxStock}
                onChange={(e) => { setMaxStock(e.target.value); setErrors((p) => ({ ...p, maxStock: "" })); }}
                placeholder="0"
                className={fieldClass("maxStock")}
              />
              {errors.maxStock && <label className="text-destructive mt-1 block">{errors.maxStock}</label>}
            </div>
          </div>
        </fieldset>

        {/* Cost */}
        <div>
          <label className="text-card-foreground block mb-1.5">
            Custo por {unit} (R$) <span className="text-destructive">*</span>
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={costPerUnit}
            onChange={(e) => { setCostPerUnit(e.target.value); setErrors((p) => ({ ...p, costPerUnit: "" })); }}
            placeholder="0,00"
            className={fieldClass("costPerUnit")}
          />
          {errors.costPerUnit && <label className="text-destructive mt-1 block">{errors.costPerUnit}</label>}
          {currentStock && costPerUnit && Number(costPerUnit) > 0 && (
            <label className="text-muted-foreground mt-1 block">
              Valor total: R$ {(Number(currentStock) * Number(costPerUnit)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </label>
          )}
        </div>

        {/* Actions — Krug: primary action is big and obvious, cancel is muted */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t border-border mt-1">
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
            {isEdit ? "Salvar Alterações" : "Adicionar Produto"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
