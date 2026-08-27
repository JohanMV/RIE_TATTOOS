import { useMemo, useState } from "react";
import { ArrowUpRight, Package } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Product, ProductCategoryId } from "@/types";
import { productCategories, productWhatsappNumber } from "../data/products";

interface ProductCatalogProps {
  context: "home" | "store";
  initialCategory?: ProductCategoryId;
  onCategoryChange?: (category: ProductCategoryId) => void;
}

function ProductCard({ product }: { product: Product }) {
  const category = productCategories.find((item) => item.id === product.category)?.label ?? "Productos";
  const message = `Hola TATTOO PERÚ. Quiero consultar por ${product.name}.`;
  const whatsappHref = `https://wa.me/${productWhatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.imageAlt}
          width="900"
          height="1100"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          style={product.imagePosition ? { objectPosition: product.imagePosition } : undefined}
        />
      </div>
      <div className="product-meta">
        <div>
          <p>{category}</p>
          <h3>{product.name}</h3>
        </div>
        <a href={whatsappHref} target="_blank" rel="noreferrer" aria-label={`Consultar ${product.name} por WhatsApp`}>
          <span>Consultar</span><ArrowUpRight size={17} weight="bold" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function ProductCatalog({ context, initialCategory = "aftercare", onCategoryChange }: ProductCatalogProps) {
  const [activeId, setActiveId] = useState<ProductCategoryId>(initialCategory);
  const reduce = useReducedMotion();
  const activeCategory = useMemo(
    () => productCategories.find((category) => category.id === activeId) ?? productCategories[0],
    [activeId],
  );

  const selectCategory = (category: ProductCategoryId) => {
    setActiveId(category);
    onCategoryChange?.(category);
  };

  return (
    <div className={`product-catalog product-catalog-${context}`}>
      <div className="product-filters" role="tablist" aria-label="Categorías de productos">
        {productCategories.map((category) => (
          <button
            key={category.id}
            id={`${context}-product-tab-${category.id}`}
            type="button"
            role="tab"
            aria-selected={activeId === category.id}
            aria-controls={`${context}-product-panel`}
            className={activeId === category.id ? "active" : ""}
            onClick={() => selectCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div
        id={`${context}-product-panel`}
        className="product-panel"
        role="tabpanel"
        aria-labelledby={`${context}-product-tab-${activeId}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {activeCategory.products.length > 0 ? (
            <motion.div
              className="product-grid"
              key={activeCategory.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: .32, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeCategory.products.slice(0, context === "home" ? 4 : undefined).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="products-empty"
              key={activeCategory.id}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: .25 }}
            >
              <Package size={34} weight="thin" aria-hidden="true" />
              <p>Próximamente en {activeCategory.label}</p>
              <span>Estamos preparando una selección que cumpla con el estándar del estudio.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
