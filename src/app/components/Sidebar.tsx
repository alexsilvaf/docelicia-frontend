import { LayoutDashboard, Package, AlertTriangle, BarChart3, Settings } from "lucide-react";
import { useNavigate } from "react-router";
import logo from "figma:asset/30db73ee53bbdad3229e7f72bda143b06096fbc6.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "estoque", label: "Estoque", icon: Package },
  { id: "alertas", label: "Alertas", icon: AlertTriangle },
  { id: "relatorios", label: "Relat&#243;rios", icon: BarChart3 },
  { id: "config", label: "Config", icon: Settings },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* ── Mobile: top header bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4 h-12">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
          <ImageWithFallback src={logo} alt="Docel&#237;cia" className="w-7 h-7 rounded-full object-cover" />
          <h4 className="text-sidebar-foreground">Docel&#237;cia</h4>
        </button>
        <label className="text-muted-foreground">Controle de Estoque</label>
      </div>

      {/* ── Mobile: bottom tab bar ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-sidebar/95 backdrop-blur border-t border-sidebar-border safe-area-bottom">
        <div className="flex justify-around items-center h-14">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer min-w-[44px] min-h-[44px] px-1 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={`text-muted-foreground ${active ? "!text-primary" : ""}`} style={{ fontSize: "10px" }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Desktop: sidebar ── */}
      <aside className="hidden lg:flex fixed lg:static z-50 top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer">
            <ImageWithFallback src={logo} alt="Docel&#237;cia" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h4 className="text-sidebar-foreground">Docel&#237;cia</h4>
              <label className="text-muted-foreground">Controle de Estoque</label>
            </div>
          </button>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors cursor-pointer ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <label className="text-muted-foreground">Ter-Sex: 15h-20h | S&#225;b: 14h-18h</label>
        </div>
      </aside>
    </>
  );
}
