import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui";

export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });
  return (
    <section id="inicio" className="hero">
      <img className="hero-image" src="/images/tattoo-hero.jpg" alt="Artista de RIE TATTOOS tatuando un diseño de cóndor" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content">
        <motion.p className="eyebrow" {...enter(0.1)}>Estudio de tatuajes en Lima</motion.p>
        <motion.h1 {...enter(0.18)}>RIE<br /><span>TATTOOS</span></motion.h1>
        <motion.p className="hero-copy" {...enter(0.26)}>Diseños que nacen de tu historia y se ejecutan con precisión.</motion.p>
        <motion.div className="hero-actions" {...enter(0.34)}>
          <Button href="#portafolio">Ver trabajos</Button>
          <Button href="#agenda" variant="secondary">Cotizar tatuaje</Button>
        </motion.div>
      </div>
      <div className="hero-signature" aria-hidden="true">LIMA</div>
    </section>
  );
}
