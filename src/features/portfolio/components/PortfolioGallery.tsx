import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import type { PortfolioPiece } from "@/types";
import { useBodyLock } from "@/hooks/useBodyLock";

interface PortfolioGalleryProps {
  work: PortfolioPiece;
  imageClassName: string;
}

export function PortfolioGallery({ work, imageClassName }: PortfolioGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const total = work.images.length;
  const previous = () => setCurrent((index) => (index - 1 + total) % total);
  const next = () => setCurrent((index) => (index + 1) % total);
  const quoteHref = `/?estilo=${encodeURIComponent(work.style)}&pieza=${work.id}&diseno=${encodeURIComponent(work.title)}#agenda`;
  const imageAlt = `${work.title}, vista ${current + 1} de ${total}, tatuaje ${work.style} en ${work.position}`;
  const closeLightbox = () => dialogRef.current?.close();

  useBodyLock(expanded);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (expanded && !dialog.open) dialog.showModal();
    if (!expanded && dialog.open) dialog.close();
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeLightbox();
    };

    document.addEventListener("keydown", handleEscape, true);
    return () => document.removeEventListener("keydown", handleEscape, true);
  }, [expanded]);

  return (
    <>
      <div className={`${imageClassName} portfolio-gallery`}>
        <button
          ref={expandButtonRef}
          type="button"
          className="gallery-expand"
          onClick={() => setExpanded(true)}
          aria-label={`Ampliar imagen de ${work.title}`}
        >
          <img key={work.images[current]} src={work.images[current]} alt={imageAlt} loading="lazy" />
        </button>
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
      <dialog
        ref={dialogRef}
        className="portfolio-lightbox"
        aria-label={`Imagen ampliada de ${work.title}`}
        onClose={() => {
          setExpanded(false);
          expandButtonRef.current?.focus();
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeLightbox();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLightbox();
        }}
      >
        <button type="button" className="portfolio-lightbox-close" onClick={closeLightbox} aria-label="Cerrar imagen ampliada">
          <X size={26} weight="bold" aria-hidden="true" />
        </button>
        <div
          className="portfolio-lightbox-media"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <img src={work.images[current]} alt={imageAlt} />
        </div>
      </dialog>
      <div className="portfolio-card-meta">
        <div><p>{work.style} / {work.position}</p><span>{work.artist}</span></div>
        <a className="gallery-quote" href={quoteHref}><span>Cotizar</span><ArrowUpRight size={16} weight="bold" /></a>
      </div>
    </>
  );
}
