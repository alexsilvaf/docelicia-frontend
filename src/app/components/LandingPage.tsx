import { useState, useRef } from "react";
import { Coffee, ChevronRight, Star, ArrowUp, Home, UtensilsCrossed, MapPin, Instagram } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MenuSection } from "./MenuSection";
import { menuCategories } from "../data/menu-data";

// Helper to find a menu item image by id
const findMenuImage = (id: string) => {
  for (const cat of menuCategories) {
    const item = cat.items.find((i) => i.id === id);
    if (item) return item.image;
  }
  return "";
};

const NAV_ITEMS = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "destaques", label: "Destaques", icon: Star },
  { id: "cardapio", label: "Cardápio", icon: UtensilsCrossed },
  { id: "contato", label: "Contato", icon: MapPin },
];

const HERO_IMG = "https://images.unsplash.com/photo-1749996089724-268703b8c4dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yJTIwd2FybSUyMHBhc3RyaWVzJTIwY29mZmVlfGVufDF8fHx8MTc3Mzg1MTk5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const BUSINESS_PHONE = "(28) 99934-8795";
const BUSINESS_PHONE_LINK = "tel:+5528999348795";
const WHATSAPP_LINK = "https://wa.me/5528999348795?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20card%C3%A1pio%20da%20Docel%C3%ADcia.";
const GOOGLE_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Doce+L%C3%ADcia+Doceria+e+Caf%C3%A9%2C+Rua+Santa+Leopoldina%2C+725%2C+Centro%2C+Pi%C3%BAma+-+ES";
const GOOGLE_MAPS_EMBED = "https://maps.google.com/maps?hl=pt-BR&q=Doce%20L%C3%ADcia%20Doceria%20e%20Caf%C3%A9%2C%20Rua%20Santa%20Leopoldina%2C%20725%2C%20Centro%2C%20Pi%C3%BAma%20-%20ES&ie=UTF8&t=&z=17&iwloc=B&output=embed";

const HIGHLIGHTS = [
  {
    name: "Brunch Completo",
    desc: "Café completo com pão integral, ovos, bacon, frutas, waffles e mel",
    price: "R$ 33,00",
    img: findMenuImage("s13"),
  },
  {
    name: "Brownie Supremo",
    desc: "Brownie, Nutella, picolé, casquinha de chocolate, morangos e castanhas",
    price: "R$ 28,00",
    img: findMenuImage("d5"),
  },
  {
    name: "Mocaccino Nutella",
    desc: "Expresso cremoso com Nutella, borda de Nutella e biscoito",
    price: "R$ 20,00",
    img: findMenuImage("q10"),
  },
  {
    name: "Açaí Split",
    desc: "Açaí com banana, morango, leite ninho, chantilly e leite condensado",
    price: "R$ 25,00",
    img: findMenuImage("d2"),
  },
];

export function LandingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setShowScrollTop((e.target as HTMLDivElement).scrollTop > 400);
  };

  return (
    <div
      ref={mainRef}
      onScroll={handleScroll}
      className="min-h-screen bg-background overflow-y-auto h-screen relative"
    >
      {/* ── Nav — Wroblewski: minimal chrome, maximum content ── */}
      <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 flex items-center justify-between h-12 md:h-14">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-1.5 cursor-pointer">
            <Coffee className="w-5 h-5 text-primary" />
            <h4 className="text-foreground">Docelícia</h4>
          </button>

          {/* Desktop nav — center */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3 py-2 rounded-button text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contato")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-button cursor-pointer hover:opacity-90 transition-opacity ml-1"
            >
              Visite-nos
            </button>
          </div>

          {/* Social icons — right side, always visible */}
          <div className="flex items-center gap-1">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/docelicia.piuma/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero — Wroblewski: content first, full-bleed image, centered on mobile ── */}
      <section id="inicio" className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            src={HERO_IMG}
            alt="Interior da Docelícia"
            className="w-full h-full object-cover"
          />
          {/* Mobile: bottom gradient for readability. Desktop: side gradient */}
          <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-r md:from-black/75 md:via-black/55 md:to-black/30" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 lg:px-6 py-16 md:py-28 lg:py-36 flex flex-col items-center text-center md:items-start md:text-left">
          <div className="max-w-lg">
            <label className="text-primary-foreground/80 block mb-1">Cafeteria & Confeitaria</label>
            <h1 className="text-primary-foreground mb-3" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
              Docelícia
            </h1>
            <p className="text-primary-foreground/90 mb-5" style={{ maxWidth: "26rem" }}>
              Sabores artesanais que aquecem o dia. Cafés especiais, brunches e doces irresistíveis.
            </p>
            {/* Wroblewski: one primary action, clear hierarchy */}
            <div className="flex flex-col gap-2.5 w-full sm:flex-row sm:w-auto">
              <button
                onClick={() => scrollTo("cardapio")}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-button cursor-pointer hover:opacity-90 transition-opacity min-h-[48px]"
              >
                Ver Cardápio
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("contato")}
                className="px-6 py-3.5 border border-primary-foreground/40 text-primary-foreground rounded-button cursor-pointer hover:bg-primary-foreground/10 transition-colors min-h-[48px]"
              >
                Como Chegar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick info — Wroblewski: no decorative icons on mobile, pure content ── */}
      <section className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-4 md:py-5">
          <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
            <div>
              <label className="text-muted-foreground">Horário</label>
              <p className="text-card-foreground">Ter a Sex · 15h–20h · Sáb · 14h–18h</p>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div>
              <label className="text-muted-foreground">Endereço</label>
              <p className="text-card-foreground">Rua Santa Leopoldina, 725 — Centro, Piúma-ES</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights — Wroblewski: horizontal scroll on mobile (thumb-friendly), grid on desktop ── */}
      <section id="destaques" className="bg-background">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 md:py-14">
          <div className="mb-5 md:mb-8 md:text-center">
            <label className="text-primary block mb-0.5">Destaques</label>
            <h2 className="text-foreground">Os mais pedidos</h2>
          </div>

          {/* Mobile: horizontal scroll. Desktop: grid */}
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible md:pb-0"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.name}
                className="min-w-[70vw] snap-start sm:min-w-[45vw] md:min-w-0 bg-card border border-border rounded-lg overflow-hidden shadow-elevation-sm group cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => scrollTo("cardapio")}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-card-foreground">{item.name}</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 text-chart-4 fill-chart-4" />
                      ))}
                    </div>
                  </div>
                  <label className="text-muted-foreground line-clamp-2 block mb-2">{item.desc}</label>
                  <p className="text-primary">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Scroll hint dots on mobile */}
          <div className="flex justify-center gap-1.5 mt-3 md:hidden">
            {HIGHLIGHTS.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-border" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Cardápio ── */}
      <section id="cardapio" className="bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 md:py-14">
          <div className="mb-5 md:mb-8 md:text-center">
            <label className="text-primary block mb-0.5">Nosso Cardápio</label>
            <h2 className="text-foreground">Feito com carinho para você</h2>
          </div>
          <MenuSection />
        </div>
      </section>

      {/* ── Contato — Wroblewski: actionable info, no decorative elements ── */}
      <section id="contato" className="bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 md:py-14">
          <div className="mb-5 md:mb-8 md:text-center">
            <label className="text-primary block mb-0.5">Venha nos visitar</label>
            <h2 className="text-foreground">Contato</h2>
          </div>

          <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
            {/* Info cards — Wroblewski: tappable, clear affordance */}
            <div className="flex flex-col gap-3">
              <div className="bg-background border border-border rounded-lg p-4">
                <label className="text-muted-foreground block mb-1">Endereço</label>
                <p className="text-card-foreground">Rua Santa Leopoldina, nº 725</p>
                <p className="text-card-foreground">Centro, Piúma-ES</p>
                <label className="text-muted-foreground block mt-1">Referência: Praça das Garças, em frente ao Bar do Bagre</label>
              </div>

              <div className="bg-background border border-border rounded-lg p-4">
                <label className="text-muted-foreground block mb-1">Funcionamento</label>
                <p className="text-card-foreground">Terça a Sexta: 15h às 20h</p>
                <p className="text-card-foreground">Sábado: 14h às 18h</p>
                <label className="text-muted-foreground block mt-1">Dom e Seg: Fechado</label>
              </div>

              <div className="bg-background border border-border rounded-lg p-4">
                <label className="text-muted-foreground block mb-1">Contato</label>
                <a href={BUSINESS_PHONE_LINK} className="block text-card-foreground hover:text-primary transition-colors">
                  {BUSINESS_PHONE}
                </a>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-button text-center hover:opacity-90 transition-opacity"
                  >
                    Falar no WhatsApp
                  </a>
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-border rounded-button text-card-foreground text-center hover:bg-muted transition-colors"
                  >
                    Abrir no Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-muted aspect-[4/3] md:aspect-auto min-h-[320px]">
              <iframe
                title="Mapa da Docelícia"
                src={GOOGLE_MAPS_EMBED}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer — minimal ── */}
      <footer className="bg-foreground">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <p className="text-primary-foreground">Docelícia</p>
            <label className="text-primary-foreground/60 text-center">
              © 2026 Docelícia Cafeteria
            </label>
          </div>
        </div>
      </footer>

      {/* Scroll to top — Wroblewski: persistent utility, above bottom tab bar on mobile */}
      {showScrollTop && (
        <button
          onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 md:bottom-5 right-4 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-elevation-sm cursor-pointer hover:opacity-90 transition-opacity min-w-[44px] min-h-[44px]"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* ── Mobile bottom tab bar — Wroblewski: thumb zone navigation ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border safe-area-bottom">
        <div className="flex justify-around items-center h-14 px-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex flex-col items-center justify-center gap-0.5 cursor-pointer text-muted-foreground hover:text-primary transition-colors min-w-[44px] min-h-[44px] px-1"
              >
                <Icon className="w-4.5 h-4.5" />
                <span style={{ fontSize: "var(--text-sm)", fontFamily: "'Inter', sans-serif" }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom spacer for mobile tab bar */}
      <div className="h-14 md:hidden" />
    </div>
  );
}
