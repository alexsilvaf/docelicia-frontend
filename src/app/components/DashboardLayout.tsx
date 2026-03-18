import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardPage } from "./DashboardPage";
import { EstoquePage } from "./EstoquePage";
import { AlertasPage } from "./AlertasPage";
import { RelatoriosPage } from "./RelatoriosPage";
import { ConfigPage } from "./ConfigPage";

export function DashboardLayout() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <DashboardPage onNavigate={setCurrentPage} />;
      case "estoque": return <EstoquePage />;
      case "alertas": return <AlertasPage />;
      case "relatorios": return <RelatoriosPage />;
      case "config": return <ConfigPage />;
      default: return <DashboardPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <main className="flex-1 min-w-0 pt-12 pb-14 lg:pt-0 lg:pb-0">
        {renderPage()}
      </main>
    </div>
  );
}