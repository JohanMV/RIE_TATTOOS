import { useEffect, useState } from "react";

export interface UseScrolledResult {
  scrolled: boolean;
  visible: boolean;
}

/**
 * Oculta el navbar al scrollear hacia abajo y lo muestra al subir.
 * - visible: false → navbar se oculta (translateY -100%)
 * - visible: true  → navbar visible
 * Ignora movimientos menores a 5px para evitar jitter.
 */
export function useScrolled(threshold = 60): UseScrolledResult {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = (): void => {
      const currentY = window.scrollY;

      if (Math.abs(currentY - lastY) > 5) {
        if (currentY > lastY && currentY > threshold) {
          // Scrolleando hacia ABAJO → ocultar
          setVisible(false);
        } else {
          // Scrolleando hacia ARRIBA → mostrar
          setVisible(true);
        }
      }

      setScrolled(currentY > threshold);
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { scrolled, visible };
}
