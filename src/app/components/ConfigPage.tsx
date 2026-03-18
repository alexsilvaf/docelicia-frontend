import { useState } from "react";
import { Save, Check } from "lucide-react";
import { ConfirmModal } from "./ConfirmModal";

export function ConfigPage() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState([true, true, true]);

  const handleToggle = (i: number) => {
    setToggles((prev) => prev.map((v, idx) => idx === i ? !v : v));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const items = [
    { label: "Alertas de estoque baixo", description: "Notificar quando um produto atingir o estoque mínimo" },
    { label: "Resumo diário", description: "Enviar resumo do estoque por e-mail diariamente" },
    { label: "Alertas de validade", description: "Notificar produtos próximos ao vencimento" },
  ];

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
      <div className="mb-6 lg:mb-8">
        <h2 className="text-foreground">Configurações</h2>
        <p className="text-muted-foreground">Preferências do sistema de estoque</p>
      </div>

      <div className="max-w-2xl flex flex-col gap-6">
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-elevation-sm">
          <h3 className="text-card-foreground mb-4">Notificações</h3>
          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-border last:border-0">
                <div className="min-w-0">
                  <p className="text-card-foreground">{item.label}</p>
                  <label className="text-muted-foreground">{item.description}</label>
                </div>
                <button
                  onClick={() => handleToggle(i)}
                  className={`w-10 h-6 rounded-full relative cursor-pointer shrink-0 transition-colors ${
                    toggles[i] ? "bg-primary" : "bg-muted"
                  }`}
                  aria-label={item.label}
                >
                  <div className={`w-4 h-4 bg-primary-foreground rounded-full absolute top-1 transition-all ${
                    toggles[i] ? "right-1" : "left-1"
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-elevation-sm">
          <h3 className="text-card-foreground mb-4">Limites Padrão</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-card-foreground mb-1.5 block">Alerta de estoque mínimo (%)</label>
              <input
                type="number"
                defaultValue={20}
                className="w-full border border-border rounded-md px-3 py-2.5 bg-input-background text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring/30 transition-colors"
              />
              <label className="text-muted-foreground mt-1 block">Produtos abaixo deste % geram alerta</label>
            </div>
            <div>
              <label className="text-card-foreground mb-1.5 block">Dias para alerta de validade</label>
              <input
                type="number"
                defaultValue={7}
                className="w-full border border-border rounded-md px-3 py-2.5 bg-input-background text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring/30 transition-colors"
              />
              <label className="text-muted-foreground mt-1 block">Alerta N dias antes do vencimento</label>
            </div>
          </div>
        </div>

        <button
          onClick={() => setConfirmOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-button cursor-pointer hover:opacity-90 transition-opacity self-start"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? "Salvo!" : "Salvar Configurações"}</span>
        </button>
      </div>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSave}
        title="Salvar Configurações"
        message="As novas configurações serão aplicadas imediatamente a todos os alertas e notificações do sistema."
        confirmLabel="Salvar"
      />
    </div>
  );
}
