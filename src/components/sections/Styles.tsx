import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Button, Reveal } from "@/components/ui";
import type { TattooStyle } from "@/types";

const styles: Array<{ name: Exclude<TattooStyle, "Todos">; copy: string; image: string }> = [
  { name: "Blackwork", copy: "Contraste, masa y ritmo para piezas de presencia contundente.", image: "/images/blackwork.webp" },
  { name: "Fine line", copy: "Trazos precisos y composiciones sutiles con detalle milimétrico.", image: "/images/fine_line_3.webp" },
  { name: "Realismo", copy: "Volumen, luz y textura para imágenes con profundidad auténtica.", image: "/images/tatuaje_realista_3.webp" },
  { name: "Geométrico", copy: "Orden visual y simbolismo andino adaptados a cada cuerpo.", image: "/images/tatuaje_geometrico_1.webp" },
];

export function Styles() {
  const [active, setActive] = useState(0);

  return (
    <section id="estilos" className="section styles-section">
      <Reveal className="styles-title"><h2>ENCUENTRA TU<br /><span>LENGUAJE VISUAL</span></h2></Reveal>
      <div className="styles-showcase">
        <div className="styles-preview" aria-hidden="true">
          <img key={styles[active].image} src={styles[active].image} alt="" loading="lazy" />
        </div>
        <div className="styles-grid">
          {styles.map((style, index) => (
            <Reveal key={style.name} delay={index * 0.06}>
              <a
                className={`style-item ${active === index ? "active" : ""}`}
                href={`/portafolio?estilo=${encodeURIComponent(style.name)}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                aria-label={`Ver trabajos de tatuaje ${style.name}`}
              >
                <img src={style.image} alt={`Ejemplo de tatuaje estilo ${style.name}`} loading="lazy" />
                <div><h3>{style.name}</h3><p>{style.copy}</p></div><ArrowUpRight size={22} aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="styles-action">
        <Button href={`/?estilo=${encodeURIComponent(styles[active].name)}#agenda`} variant="text" arrow>
          Cotizar {styles[active].name}
        </Button>
      </div>
    </section>
  );
}
