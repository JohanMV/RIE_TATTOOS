import { InstagramLogo, TiktokLogo, WhatsappLogo } from "@phosphor-icons/react";
import { navItems, whatsappNumber } from "@/data/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <p className="footer-brand">RIE<br /><span>TATTOOS</span></p>
        <div className="footer-links">
          {navItems.slice(1).map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <div className="footer-contact">
          <p>Miraflores, Lima<br />Solo con cita previa</p>
          <div className="socials">
            <a href="https://instagram.com" aria-label="Instagram"><InstagramLogo size={24} /></a>
            <a href={`https://wa.me/${whatsappNumber}`} aria-label="WhatsApp"><WhatsappLogo size={24} /></a>
            <a href="https://www.tiktok.com" aria-label="TikTok"><TiktokLogo size={24} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} RIE TATTOOS</span><span>Arte permanente. Decisiones conscientes.</span></div>
    </footer>
  );
}
