import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navItems } from "@/data/content";
import { useBodyLock } from "@/hooks/useBodyLock";
import { useScrolled } from "@/hooks/useScrolled";
import { Button } from "@/components/ui";

type NavbarProps = {
  activeItem?: (typeof navItems)[number][0];
  ctaLabel?: string;
};

export function Navbar({ activeItem, ctaLabel = "Agendar cita" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrolled, visible } = useScrolled(60);
  useBodyLock(open);
  const isHome = (window.location.pathname.replace(/\/+$/, "") || "/") === "/";
  const resolveHref = (href: string) => href.startsWith("#") && !isHome ? `/${href}` : href;

  return (
    <header className={[
      "navbar",
      scrolled ? "navbar--scrolled" : "",
      (!visible && !open) ? "navbar--hidden" : "",
    ].filter(Boolean).join(" ")}>
      <a className="brand" href={resolveHref("#inicio")} aria-label="RIE TATTOOS, inicio">
        <img className="brand-mark" src="/logo_rie_tattoos.webp" alt="" /><span>RIE TATTOOS</span>
      </a>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {navItems.map(([label, href]) => (
          <a key={href} href={resolveHref(href)} aria-current={activeItem === label ? "page" : undefined}>{label}</a>
        ))}
      </nav>
      <Button href={resolveHref("#agenda")} className="nav-cta">{ctaLabel}</Button>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"}>
        {open ? <X size={24} /> : <List size={24} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Navegación móvil"
            initial={reduce ? false : { opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            {navItems.map(([label, href]) => (
              <a key={href} href={resolveHref(href)} aria-current={activeItem === label ? "page" : undefined} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <Button href={resolveHref("#agenda")} onClick={() => setOpen(false)}>{ctaLabel}</Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
