import { ArrowUpRight, Drop, ShieldCheck, SunHorizon } from "@phosphor-icons/react";
import { Reveal } from "@/components/ui";

const care = [
  { icon: Drop, title: "Limpieza", copy: "Lava con suavidad y seca sin frotar." },
  { icon: ShieldCheck, title: "Protección", copy: "Usa solo el producto indicado por tu artista." },
  { icon: SunHorizon, title: "Recuperación", copy: "Evita sol, piscina y fricción durante el proceso." },
];

export function Care() {
  return (
    <section id="cuidados" className="section care-section">
      <Reveal className="care-image"><img src="/images/cuidados.webp" alt="Tatuaje en proceso de cuidado y cicatrización" loading="lazy" /></Reveal>
      <Reveal className="care-content">
        <h2>LA OBRA NO TERMINA<br /><span>AL SALIR DEL ESTUDIO</span></h2>
        <p>Una buena cicatrización conserva la precisión de cada línea. Te acompañamos con indicaciones simples y responsables.</p>
        <div className="care-grid">
          {care.map(({ icon: Icon, title, copy }) => <div key={title}><Icon size={24} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
        <a className="care-link" href="#agenda">Recibir guía completa <ArrowUpRight size={18} /></a>
      </Reveal>
    </section>
  );
}
