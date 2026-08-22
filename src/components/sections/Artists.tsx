import { artists } from "@/data/content";
import { Reveal } from "@/components/ui";

export function Artists() {
  return (
    <section id="artistas" className="section artists-section">
      <Reveal><h2>LA MANO<br />DETRÁS DE<br /><span>LA OBRA</span></h2></Reveal>
      <div className="artist-list">
        {artists.map((artist, index) => (
          <Reveal key={artist.name} delay={index * 0.08}>
            <article className="artist">
              <div className="artist-image"><img src={artist.image} alt={`Retrato de ${artist.name}`} loading="lazy" /></div>
              <div className="artist-info"><p>{artist.role}</p><h3>{artist.name}</h3><span>{artist.styles}</span><a href="#agenda">Conocer y agendar</a></div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
