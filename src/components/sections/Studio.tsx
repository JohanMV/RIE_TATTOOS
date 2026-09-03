import { Check } from "@phosphor-icons/react";
import { Button, Reveal } from "@/components/ui";

const assurances = ["Material esterilizado y descartable", "Diseño original para cada anatomía", "Seguimiento durante la cicatrización"];

export function Studio() {
  return (
    <section id="estudio" className="studio-section">
      <div className="studio-image"><img src="/images/tattoo-artist.jpg" alt="Interior y artista del estudio RIE TATTOO'S" loading="lazy" /></div>
      <Reveal className="studio-copy">
        <h2>UN ESTUDIO<br />HECHO PARA<br /><span>CREAR CON CALMA</span></h2>
        <p>Trabajamos con cita previa para dedicar tiempo real a cada idea. El espacio, los materiales y el proceso responden a un solo estándar: hacer las cosas bien.</p>
        <div className="assurance-list">
          {assurances.map((item) => <div key={item}><Check size={18} weight="bold" aria-hidden="true" /><span>{item}</span></div>)}
        </div>
        <Button href="https://www.google.com/maps/place/Av.+Angamos+Este+1993,+San+Borja+15036/@-12.112228,-77.0099085,69m/data=!3m1!1e3!4m6!3m5!1s0x9105c7e1fa3aaeab:0xd9bfd4d56db7b85!8m2!3d-12.1121046!4d-77.0097986!16s%2Fg%2F11pw3jr713?entry=ttu&g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" variant="secondary" arrow>Visita el estudio</Button>
      </Reveal>
    </section>
  );
}
