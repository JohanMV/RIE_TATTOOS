import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui";
import type { ProductCategoryId } from "@/types";
import { productCategories } from "../data/products";
import { ProductCatalog } from "./ProductCatalog";

function getInitialCategory(): ProductCategoryId {
  const requested = new URLSearchParams(window.location.search).get("categoria");
  return productCategories.some((category) => category.id === requested)
    ? requested as ProductCategoryId
    : "aftercare";
}

export function ProductsPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Productos | TATTOO PERÚ";
    return () => { document.title = previousTitle; };
  }, []);

  const syncCategory = (category: ProductCategoryId) => {
    const url = new URL(window.location.href);
    if (category === "aftercare") url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", category);
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  };

  return (
    <div className="products-page">
      <header className="products-page-nav">
        <a className="brand" href="/#inicio" aria-label="Volver al inicio de TATTOO PERÚ">
          <span className="brand-mark">TP</span><span>TATTOO PERÚ</span>
        </a>
        <a className="products-back" href="/#productos"><ArrowLeft size={18} aria-hidden="true" /> Volver al inicio</a>
        <Button href="/#agenda">Agendar cita</Button>
      </header>

      <main>
        <section className="products-page-hero">
          <p className="eyebrow">Selección del estudio</p>
          <h1>CUIDADO PARA LA PIEL.<br /><span>EQUIPO PARA EL OFICIO.</span></h1>
          <p>Artículos elegidos para acompañar el cuidado del tatuaje y el trabajo profesional.</p>
        </section>

        <section className="products-archive" aria-labelledby="products-archive-title">
          <div className="products-archive-heading">
            <h2 id="products-archive-title">Catálogo</h2>
            <p>Consulta disponibilidad directamente con el estudio.</p>
          </div>
          <ProductCatalog context="store" initialCategory={getInitialCategory()} onCategoryChange={syncCategory} />
        </section>
      </main>

      <footer className="products-page-footer">
        <span>© {new Date().getFullYear()} TATTOO PERÚ</span>
        <a href="/#agenda">Reservar tatuaje <ArrowUpRight size={16} aria-hidden="true" /></a>
      </footer>
    </div>
  );
}
