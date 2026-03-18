import { useState, useRef, useEffect } from "react";
import { menuCategories } from "../data/menu-data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/**
 * Mobile-first menu section with uniform card heights.
 */
export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tabsRef.current?.querySelector(`[data-tab="${activeCategory}"]`) as HTMLElement | null;
    if (el && tabsRef.current) {
      const container = tabsRef.current;
      const scrollLeft = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeCategory]);

  const activeItems = menuCategories.find((c) => c.id === activeCategory)?.items ?? [];

  return (
    <div>
      {/* Category tabs — underline active indicator */}
      <div
        ref={tabsRef}
        className="flex gap-1 overflow-x-auto pb-3 mb-5 md:mb-6 border-b border-border md:justify-center"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {menuCategories.map((cat) => (
          <button
            key={cat.id}
            data-tab={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2.5 cursor-pointer whitespace-nowrap transition-colors shrink-0 min-h-[44px] relative border-b-2 -mb-[13px] ${
              activeCategory === cat.id
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Items — uniform height cards */}
      <div className="flex flex-col gap-2.5 md:grid md:grid-cols-2 md:gap-3">
        {activeItems.map((item) => (
          <div
            key={item.id}
            className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-elevation-sm transition-shadow flex flex-row h-[120px] md:h-[140px]"
          >
            {/* Image — fixed width, fills card height */}
            <div className="w-[100px] md:w-[120px] shrink-0 h-full">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content — clipped to card height */}
            <div className="flex-1 min-w-0 p-2.5 md:p-3 flex flex-col overflow-hidden">
              {/* Name + Price */}
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <p className="text-card-foreground min-w-0 line-clamp-1">{item.name}</p>
                <label className="text-primary shrink-0 whitespace-nowrap">
                  R$ {item.price.toFixed(2).replace(".", ",")}
                </label>
              </div>

              {/* Description */}
              {item.description && (
                <label className="text-muted-foreground block line-clamp-2 mb-0.5">{item.description}</label>
              )}

              {/* Options — compact, fills remaining space */}
              {item.options && item.options.length > 0 && (
                <div className="mt-auto pt-1 border-t border-border overflow-hidden">
                  <label className="text-muted-foreground line-clamp-2">
                    {item.options.join(" · ")}
                  </label>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <label className="text-muted-foreground">
          {activeItems.length} {activeItems.length === 1 ? "item" : "itens"}
        </label>
      </div>
    </div>
  );
}
