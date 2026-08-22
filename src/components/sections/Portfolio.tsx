import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { filters, portfolio } from "@/data/content";
import type { TattooStyle } from "@/types";
import { Button, Reveal } from "@/components/ui";
import { PortfolioGallery } from "@/features/portfolio/components";

export function Portfolio() {
  const [active, setActive] = useState<TattooStyle>("Todos");
  const reduce = useReducedMotion();
  const works = useMemo(() => active === "Todos" ? portfolio : portfolio.filter((item) => item.style === active), [active]);
  const featuredWorks = works.slice(0, 4);
  return (
    <section id="portafolio" className="section portfolio-section">
      <Reveal className="section-heading">
        <h2>TRABAJOS QUE<br /><span>HABLAN SOLOS</span></h2>
        <p>Una selección de piezas construidas para la anatomía, el movimiento y la historia de cada persona.</p>
      </Reveal>
      <div className="filter-row" role="group" aria-label="Filtrar portafolio por estilo">
        {filters.map((filter) => (
          <button key={filter} className={active === filter ? "active" : ""} onClick={() => setActive(filter)} aria-pressed={active === filter}>{filter}</button>
        ))}
      </div>
      <motion.div className={`portfolio-grid portfolio-count-${featuredWorks.length}`} layout>
        <AnimatePresence mode="popLayout">
          {featuredWorks.map((work, index) => (
            <motion.article className={`work work-${index + 1}`} key={work.id} layout
              initial={reduce ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
              <PortfolioGallery work={work} imageClassName="work-image-wrap" />
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="portfolio-action">
        <Button href="/portafolio" target="_blank" rel="noreferrer" variant="secondary" arrow>Ver portafolio completo</Button>
      </div>
    </section>
  );
}
