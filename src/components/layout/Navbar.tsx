import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navItems } from "@/data/content";
import { useBodyLock } from "@/hooks/useBodyLock";
import { Button } from "@/components/ui";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  useBodyLock(open);

  return (
    <header className="navbar">
      <a className="brand" href="#inicio" aria-label="TATTOO PERÚ, inicio">
        <span className="brand-mark">TP</span><span>TATTOO PERÚ</span>
      </a>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <Button href="#agenda" className="nav-cta">Agendar cita</Button>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"}>
        {open ? <X size={24} /> : <List size={24} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Navegación móvil"
            initial={reduce ? false : { opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <Button href="#agenda" onClick={() => setOpen(false)}>Agendar cita</Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
