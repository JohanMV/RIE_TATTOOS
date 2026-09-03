import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { filters, portfolio } from "@/data/content";
import type { TattooStyle } from "@/types";
import { Navbar } from "@/components/layout";
import { PortfolioGallery } from "./PortfolioGallery";

function getInitialFilter(): TattooStyle {
  const requested = new URLSearchParams(window.location.search).get("estilo");
  return requested && filters.includes(requested as TattooStyle) ? requested as TattooStyle : "Todos";
}

export function PortfolioPage() {
  const [active, setActive] = useState<TattooStyle>(getInitialFilter);
  const reduce = useReducedMotion();
  const works = useMemo(() => active === "Todos" ? portfolio : portfolio.filter((work) => work.style === active), [active]);

  const selectFilter = (filter: TattooStyle) => {
    setActive(filter);
    const url = new URL(window.location.href);
    if (filter === "Todos") url.searchParams.delete("estilo");
    else url.searchParams.set("estilo", filter);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Portafolio completo | TATTOO PERÚ";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="portfolio-page">
      <Navbar activeItem="Portafolio" ctaLabel="Cotizar tatuaje" />

      <main>
        <section className="portfolio-page-hero">
          <img className="portfolio-page-hero-image" src="/images/porfafolio_banner_.webp" alt="" fetchPriority="high" />
          <div className="portfolio-page-hero-content">
            <p className="eyebrow">Archivo completo</p>
            <h1>TODAS LAS PIEZAS.<br /><span>TODOS LOS ESTILOS.</span></h1>
            <p>Explora el trabajo del estudio y encuentra el artista indicado para tu próxima idea.</p>
          </div>
        </section>

        <section className="portfolio-archive" aria-labelledby="archive-title">
          <div className="archive-toolbar">
            <h2 id="archive-title">Portafolio</h2>
            <p>{works.length} {works.length === 1 ? "trabajo" : "trabajos"}</p>
          </div>
          <div className="filter-row" role="group" aria-label="Filtrar portafolio completo por estilo">
            {filters.map((filter) => (
              <button key={filter} className={active === filter ? "active" : ""} onClick={() => selectFilter(filter)} aria-pressed={active === filter}>{filter}</button>
            ))}
          </div>
          <motion.div className="archive-grid" layout>
            <AnimatePresence mode="popLayout">
              {works.map((work) => (
                <motion.article className="archive-work" key={work.id} layout
                  initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }}>
                  <PortfolioGallery work={work} imageClassName="archive-image" />
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

      </main>

      <footer className="portfolio-page-footer">
        <span>© {new Date().getFullYear()} TATTOO PERÚ</span>
        <a href="/#inicio">Volver al estudio <ArrowUpRight size={16} /></a>
      </footer>
    </div>
  );
}
