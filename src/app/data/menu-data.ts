export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  options?: string[];
  image: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

// ── Image URLs ──
// Real product photos (figma:asset) where available, Unsplash fallbacks otherwise
import toastReal from "figma:asset/efe0e44f0b3633eeefb10460e157c6b3db1624e3.png";
import croissantReal from "figma:asset/44ef2cb3db65f759084040633dffc9a37ed7c38d.png";
import waffleSorveteReal from "figma:asset/8d94192d407532f50a44e02a1a68a5823d65731c.png";
import waffleMelReal from "figma:asset/8b99101626550957592655b7a5b8ef64410ab19a.png";
import tabuaWafflesReal from "figma:asset/c32c7c023ae53920750565cbee799def8d5f9f23.png";
import frapeChocolateReal from "figma:asset/b792c1b14078b8bd794685cb2eaf53064c2e4a64.png";
import frapeMorangoReal from "figma:asset/96d83b20b314dadffe6be6cd5a1bbc55fed13d3e.png";
import brownieSupremoReal from "figma:asset/b1824cdd2ad1841b870eaa58a85a9a786a68907f.png";
import tortaSalgadaReal from "figma:asset/24d8790fc7e5a0513fc1d8949221b116eb187518.png";
import petitGateauReal from "figma:asset/a8414d15b6ac25ab8f0725c5eb1a5d44d18abed5.png";
import waffleNutellaReal from "figma:asset/4f1969753b89efc08fcf9688dcca0d36126acc67.png";
import paoQueijoReal from "figma:asset/8e10ba70d2df2373cf4dc8ad025c0450946b90bc.png";
import quicheReal from "figma:asset/95f1b936716d2087da26e5d90933f3e464e1c663.png";
import brunchReal from "figma:asset/298b1d1553fa028997cbec4fa39ef5a2ab19f722.png";
import batataReal from "figma:asset/62610195e48c755b6f62032e0ad85350211e8515.png";
import escondidinhoReal from "figma:asset/b9196ccb42c6ab8968e0b9caafb6bbac6724e531.png";
import sodaItalianaReal from "figma:asset/d0a3b490f6129623e0e01e11b57ce451d978ac2f.png";

const IMG = {
  paoQueijo: paoQueijoReal,
  waffle: "https://images.unsplash.com/photo-1686860636609-095ef1c40caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2UlMjB3YWZmbGUlMjBzYXZvcnklMjBwbGF0ZXxlbnwxfHx8fDE3NzM4NTIzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  panqueca: "https://images.unsplash.com/photo-1771250248303-ea1cc06c3288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVwZSUyMHBhbmNha2UlMjBtZWF0JTIwZmlsbGluZyUyMHBsYXRlfGVufDF8fHx8MTc3Mzg1MjMyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  quiche: quicheReal,
  batata: batataReal,
  toast: toastReal,
  tortaSalgada: tortaSalgadaReal,
  brunch: brunchReal,
  croissant: croissantReal,
  cocada: "https://images.unsplash.com/photo-1647687214098-dcaf55a891fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NvbnV0JTIwZGVzc2VydCUyMGljZSUyMGNyZWFtJTIwY2FyYW1lbHxlbnwxfHx8fDE3NzM4NTIzMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  acai: "https://images.unsplash.com/photo-1750677637353-c2cfe6d54297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FpJTIwYm93bCUyMGdyYW5vbGElMjBiZXJyaWVzJTIwcHVycGxlfGVufDF8fHx8MTc3Mzg1MjMzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  brownie: "https://images.unsplash.com/photo-1757030477866-31f7076d49a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93bmllJTIwaWNlJTIwY3JlYW0lMjBjaG9jb2xhdGUlMjBzYXVjZSUyMGRlc3NlcnR8ZW58MXx8fHwxNzczODUyMzM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  brownieSensacao: brownieSupremoReal,
  petitGateau: petitGateauReal,
  waffleNutella: waffleNutellaReal,
  waffleMel: waffleMelReal,
  waffleSorvete: waffleSorveteReal,
  espresso: "https://images.unsplash.com/photo-1732556185440-f4a02ec42bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cCUyMGRhcmslMjBjcmVtYXxlbnwxfHx8fDE3NzM4NTIzNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  coado: "https://images.unsplash.com/photo-1603124712721-e5699777490c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VyJTIwb3ZlciUyMGRyaXAlMjBjb2ZmZWUlMjBzcGVjaWFsdHl8ZW58MXx8fHwxNzczODUyMzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  chocolate: "https://images.unsplash.com/photo-1572839101084-3928fd0f63c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjBjaG9jb2xhdGUlMjBtYXJzaG1hbGxvdyUyMG11ZyUyMGNvenl8ZW58MXx8fHwxNzczODUyMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  cappuccino: "https://images.unsplash.com/photo-1763473821509-9a383b480844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwZm9hbSUyMGxhdHRlJTIwYXJ0JTIwdG9wJTIwdmlld3xlbnwxfHx8fDE3NzM4NTIzNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  mocha: "https://images.unsplash.com/photo-1596078841463-5504c992222f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2NoYSUyMGNvZmZlZSUyMGNob2NvbGF0ZSUyMGNyZWFtJTIwZ2xhc3N8ZW58MXx8fHwxNzczODUyMzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  affogato: "https://images.unsplash.com/photo-1592663533909-f75fe1ae99a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwYWZmb2dhdG8lMjBpY2UlMjBjcmVhbSUyMGVzcHJlc3NvfGVufDF8fHx8MTc3Mzg1MjM0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  chantilly: "https://images.unsplash.com/photo-1637194502327-c99c94943680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGlwcGVkJTIwY3JlYW0lMjB0b3BwaW5nJTIwZGVzc2VydCUyMGRvbGxvcHxlbnwxfHx8fDE3NzM4NTIzNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  doceDeLeite: "https://images.unsplash.com/photo-1568657704598-602700bd9694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJhbWVsJTIwc2F1Y2UlMjBqYXIlMjBkcml6emxlJTIwZ29sZGVufGVufDF8fHx8MTc3Mzg1MjM1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  escondidinho: escondidinhoReal,
  // New images for bebidas geladas completa
  frapeChocolate: frapeChocolateReal,
  frapeMorango: frapeMorangoReal,
  sodaItaliana: sodaItalianaReal,
  sucoPulpa: "https://images.unsplash.com/photo-1570179755590-00f1b1bd663a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0JTIwanVpY2UlMjBwdWxwJTIwZ2xhc3MlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzM4NTMwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  agua: "https://images.unsplash.com/photo-1758720318042-0dc27be9a061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHdhdGVyJTIwY2xlYXIlMjByZWZyZXNoaW5nJTIwc2ltcGxlfGVufDF8fHx8MTc3Mzg1NDE3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  refrigerante: "https://images.unsplash.com/photo-1533923378594-bbeb91030909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwY2FucyUyMGNvY2ElMjBjb2xhJTIwZmFudGElMjB2YXJpZXR5fGVufDF8fHx8MTc3Mzg1MzAxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  h2o: "https://images.unsplash.com/photo-1662058595162-10e024b1a907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoMm8lMjBmbGF2b3JlZCUyMHdhdGVyJTIwbGVtb24lMjBib3R0bGV8ZW58MXx8fHwxNzczODUzMDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  guaravita: "https://images.unsplash.com/photo-1680737562705-3cdc1ddfaf9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWFyYW5hJTIwY2FuJTIwYnJhemlsaWFuJTIwc29kYSUyMGdyZWVufGVufDF8fHx8MTc3Mzg1MzAxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

export const menuCategories: MenuCategory[] = [
  {
    id: "salgados",
    name: "Opções Salgadas",
    icon: "",
    items: [
      { id: "s1", name: "Pão de Queijo Tradicional", price: 7, description: "Porção com 04 unidades", image: IMG.paoQueijo },
      { id: "s2", name: "Pão de Queijo 3 Queijos", price: 7, description: "Porção com 03 unidades — parmesão, canastra e provolone", image: IMG.paoQueijo },
      { id: "s3", name: "Pão de Queijo Waffles", price: 8, description: "01 unidade de pão de queijo em formato de waffles", image: IMG.waffle },
      { id: "s4", name: "Tábua de Waffles", price: 20, description: "Acompanha goiabada e requeijão", image: tabuaWafflesReal },
      { id: "s5", name: "Panqueca", price: 24, options: ["Carne com requeijão e molho de tomate caseiro", "Frango com cream cheese e molho de tomate caseiro"], image: IMG.panqueca },
      { id: "s6", name: "Escondidinho", price: 22, options: ["Camarão", "Carne", "Carne seca"], image: IMG.escondidinho },
      { id: "s7", name: "Quiche", price: 18, options: ["Filé mignon com gorgonzola", "Alho poró e bacon", "Quatro queijos"], image: IMG.quiche },
      { id: "s8", name: "Waffles de Queijo", price: 18, description: "Waffle gratinado com requeijão, tomate confit, orégano e mussarela", image: IMG.waffle },
      { id: "s9", name: "Batata Recheada", price: 28, description: "Consultar sabores", image: IMG.batata },
      { id: "s10", name: "Toast", price: 26, options: ["Pão rústico com creme de ricota, queijo, banana brûlée e mel", "Pão rústico com creme de ricota, ervas finas, provolone, mussarela, tomate confit e manjericão"], image: IMG.toast },
      { id: "s11", name: "Torta Salgada", price: 16, image: IMG.tortaSalgada },
      { id: "s12", name: "Brunch", price: 29, description: "Fatia de pão integral com ovos mexidos com queijo e bacon crocante", image: IMG.brunch },
      { id: "s13", name: "Brunch Completo", price: 33, description: "Café completo com pão integral, ovos mexidos, bacon, frutas, waffles, granola e mel", image: IMG.brunch },
      { id: "s14", name: "Croissant", price: 22, options: ["Presunto e mussarela", "Peito de peru e cream cheese"], image: IMG.croissant },
    ],
  },
  {
    id: "doces",
    name: "Opções Doces",
    icon: "",
    items: [
      { id: "d1", name: "Cocada Cremosa", price: 20, description: "Doce de coco cremoso, sorvete de creme e calda de doce de leite", image: IMG.cocada },
      { id: "d2", name: "Açaí Split", price: 25, description: "Açaí com banana, morango, leite ninho, chantilly e leite condensado", image: IMG.acai },
      { id: "d3", name: "Brownie com Sorvete", price: 22, description: "Brownie servido com sorvete de creme e calda de chocolate", image: IMG.brownie },
      { id: "d4", name: "Brownie Sensação", price: 25, description: "Brownie com sorvete de creme, Nutella, morangos e calda de chocolate", image: IMG.brownieSensacao },
      { id: "d5", name: "Brownie Supremo", price: 28, description: "Brownie, Nutella, picolé sabor morango, casquinha de chocolate, morangos e castanhas", image: IMG.brownieSensacao },
      { id: "d6", name: "Petit Gateau", price: 23, image: IMG.petitGateau },
      { id: "d7", name: "Waffles com Nutella", price: 20, description: "2 unidades servidas com Nutella", image: IMG.waffleNutella },
      { id: "d8", name: "Waffles com Mel", price: 20, description: "2 unidades servidas com mel e frutas", image: IMG.waffleMel },
      { id: "d9", name: "Waffles com Sorvete", price: 23, options: ["Waffle, Nutella, morango e sorvete", "Waffle, doce de leite, chantilly, banana, sorvete e canela"], image: IMG.waffleSorvete },
    ],
  },
  {
    id: "quentes",
    name: "Bebidas Quentes",
    icon: "",
    items: [
      { id: "q1", name: "Café Expresso Curto", price: 6, description: "50ml", image: IMG.espresso },
      { id: "q2", name: "Café Expresso Longo", price: 7, description: "80ml", image: IMG.espresso },
      { id: "q3", name: "Café Coado", price: 10, description: "170ml — Café especial 100% arábica coado na hora", image: IMG.coado },
      { id: "q4", name: "Chocolate Quente", price: 20, description: "200ml — Chocolate cremoso, borda de chocolate e marshmallow", image: IMG.chocolate },
      { id: "q5", name: "Cappuccino Tradicional", price: 12, description: "Já adoçado", image: IMG.cappuccino },
      { id: "q6", name: "Cappuccino Diet", price: 14, description: "Já adoçado", image: IMG.cappuccino },
      { id: "q7", name: "Cappuccino Especial da Casa", price: 14, description: "Mais cremoso com toque de chocolate, já adoçado", image: IMG.cappuccino },
      { id: "q8", name: "Cappuccino Italiano", price: 12, description: "Expresso com leite cremoso", image: IMG.cappuccino },
      { id: "q9", name: "Mocaccino Tradicional", price: 15, description: "Expresso com leite cremoso e chocolate (ou doce de leite)", image: IMG.mocha },
      { id: "q10", name: "Mocaccino Nutella", price: 20, description: "Expresso com leite cremoso, Nutella, borda de Nutella e biscoito", image: IMG.mocha },
      { id: "q11", name: "Mocaccino Doce de Leite", price: 20, description: "Expresso com leite cremoso, doce de leite, chantilly e waffle holandês", image: IMG.mocha },
    ],
  },
  {
    id: "geladas",
    name: "Bebidas Geladas",
    icon: "",
    items: [
      { id: "g1", name: "Affogato", price: 18, description: "Sorvete de creme com café espresso, borda de Nutella e chantilly", image: IMG.affogato },
      { id: "g2", name: "Cappuccino Gelado", price: 20, description: "Leite, calda de caramelo, borda de doce de leite e chantilly", image: IMG.affogato },
      { id: "g3", name: "Frapê Chocolate", price: 20, description: "220ml — Bebida gelada de chocolate com leite, chantilly, calda de chocolate, borda de Nutella e castanha", image: IMG.frapeChocolate },
      { id: "g4", name: "Frapê Morango", price: 20, description: "220ml — Bebida gelada sabor morango com leite, chantilly, calda de morango e borda de Ninho cremoso", image: IMG.frapeMorango },
      { id: "g5", name: "Soda Italiana", price: 16, description: "250ml", options: ["Maçã verde", "Frutas vermelhas", "Limão siciliano"], image: IMG.sodaItaliana },
      { id: "g6", name: "H2O Limão", price: 9, description: "500ml", image: IMG.h2o },
      { id: "g7", name: "Suco de Polpa", price: 4, description: "250ml — Consultar sabores", image: IMG.sucoPulpa },
      { id: "g8", name: "Água Sem Gás", price: 4, image: IMG.agua },
      { id: "g9", name: "Água Com Gás", price: 5, image: IMG.agua },
      { id: "g10", name: "Refrigerantes", price: 8, description: "Coca-Cola, Coca Zero, Guaraná, Guaraná Zero, Fanta", image: IMG.refrigerante },
      { id: "g11", name: "Guaravita", price: 4, image: IMG.guaravita },
    ],
  },
];