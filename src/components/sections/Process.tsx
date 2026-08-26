import { Reveal } from "@/components/ui";

const process = [
  { title: "Cuéntanos tu idea", copy: "Envía referencias, zona del cuerpo y tamaño aproximado.", mobileCopy: "Referencias, zona y tamaño." },
  { title: "Define la propuesta", copy: "El artista traduce tu intención en una pieza original.", mobileCopy: "Convertimos tu idea en una pieza original." },
  { title: "Reserva tu sesión", copy: "Confirmamos fecha, duración estimada y preparación previa.", mobileCopy: "Definimos fecha, duración y preparación." },
  { title: "Cuida tu tatuaje", copy: "Recibes una guía clara y acompañamiento de cicatrización.", mobileCopy: "Guía y seguimiento de cicatrización." },
];

export function Process() {
  return (
    <section className="section process-section">
      <Reveal className="process-intro"><p className="eyebrow">Nuestro proceso</p><h2>DE LA IDEA<br /><span>A TU PIEL</span></h2></Reveal>
      <div className="process-track">
        {process.map((step, index) => (
          <Reveal key={step.title} className="process-step" delay={index * 0.07}>
            <strong>{String(index + 1).padStart(2, "0")}</strong><h3>{step.title}</h3>
            <p><span className="process-copy-desktop">{step.copy}</span><span className="process-copy-mobile">{step.mobileCopy}</span></p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
