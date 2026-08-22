import { Check } from "@phosphor-icons/react";
import { Button, Reveal } from "@/components/ui";

const assurances = ["Material esterilizado y descartable", "Diseño original para cada anatomía", "Seguimiento durante la cicatrización"];

export function Studio() {
  return (
    <section id="estudio" className="studio-section">
      <div className="studio-image"><img src="/images/tattoo-artist.jpg" alt="Interior y artista del estudio TATTOO PERÚ" loading="lazy" /></div>
      <Reveal className="studio-copy">
        <h2>UN ESTUDIO<br />HECHO PARA<br /><span>CREAR CON CALMA</span></h2>
        <p>Trabajamos con cita previa para dedicar tiempo real a cada idea. El espacio, los materiales y el proceso responden a un solo estándar: hacer las cosas bien.</p>
        <div className="assurance-list">
          {assurances.map((item) => <div key={item}><Check size={18} weight="bold" aria-hidden="true" /><span>{item}</span></div>)}
        </div>
        <Button href="#agenda" variant="secondary" arrow>Visita el estudio</Button>
      </Reveal>
    </section>
  );
}
