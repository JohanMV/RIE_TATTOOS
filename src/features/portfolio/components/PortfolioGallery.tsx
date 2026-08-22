import { useState } from "react";
import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { PortfolioPiece } from "@/types";

interface PortfolioGalleryProps {
  work: PortfolioPiece;
  imageClassName: string;
}

export function PortfolioGallery({ work, imageClassName }: PortfolioGalleryProps) {
  const [current, setCurrent] = useState(0);
  const total = work.images.length;
  const previous = () => setCurrent((index) => (index - 1 + total) % total);
  const next = () => setCurrent((index) => (index + 1) % total);
  const quoteHref = `/?estilo=${encodeURIComponent(work.style)}&pieza=${work.id}&diseno=${encodeURIComponent(work.title)}#agenda`;

  return (
    <>
      <div className={`${imageClassName} portfolio-gallery`}>
        <img key={work.images[current]} src={work.images[current]}
          alt={`${work.title}, vista ${current + 1} de ${total}, tatuaje ${work.style} en ${work.position}`} loading="lazy" />
        <span className="gallery-counter" aria-live="polite">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="gallery-navigation">
          <button type="button" onClick={previous} aria-label={`Ver foto anterior de ${work.title}`}><CaretLeft size={18} weight="bold" /></button>
          <button type="button" onClick={next} aria-label={`Ver foto siguiente de ${work.title}`}><CaretRight size={18} weight="bold" /></button>
        </div>
        <div className="gallery-progress" aria-hidden="true">
          {work.images.map((image, index) => <span key={image} className={index === current ? "active" : ""} />)}
        </div>
      </div>
      <div className="portfolio-card-meta">
        <div><p>{work.style} / {work.position}</p><span>{work.artist}</span></div>
        <a className="gallery-quote" href={quoteHref}><span>Cotizar</span><ArrowUpRight size={16} weight="bold" /></a>
      </div>
    </>
  );
}
