import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { whatsappNumber } from "@/data/content";
import { DateTimePicker, Reveal } from "@/components/ui";

export function Quote() {
  const [sent, setSent] = useState(false);
  const [desiredDate, setDesiredDate] = useState("");
  const [dateError, setDateError] = useState("");
  const quoteStyles = ["Blackwork", "Fine line", "Realismo", "Geométrico", "Aún no lo sé"];
  const requestedStyle = new URLSearchParams(window.location.search).get("estilo") ?? "";
  const requestedDesign = new URLSearchParams(window.location.search).get("diseno") ?? "";
  const initialStyle = quoteStyles.includes(requestedStyle) ? requestedStyle : "";

  useEffect(() => {
    if (window.location.hash === "#agenda") {
      document.getElementById("agenda")?.scrollIntoView();
    }
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!desiredDate) {
      setDateError("Selecciona una fecha y una hora.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const referenceUrl = String(data.get("referenceUrl") ?? "").trim();
    const selectedDesign = String(data.get("portfolioDesign") ?? "").trim();
    const desiredDateValue = new Date(desiredDate);
    const formattedDesiredDate = desiredDateValue.toLocaleString("es-PE", { dateStyle: "long", timeStyle: "short", hour12: true });
    const message = `Hola RIE TATTOOS. Soy ${data.get("name")}. Quiero cotizar un tatuaje ${data.get("style")} en ${data.get("zone")}.${selectedDesign ? ` Me interesa la pieza "${selectedDesign}" del portafolio.` : ""} Mi fecha y hora preferidas son ${formattedDesiredDate}. Mi idea: ${data.get("idea")}.${referenceUrl ? ` Imagen de referencia: ${referenceUrl}.` : ""}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setDesiredDate("");
    setDateError("");
    setSent(true);
  };
  return (
    <section id="agenda" className="quote-section">
      <Reveal className="quote-heading"><p className="eyebrow">Cotización personalizada</p><h2>TU PRÓXIMA PIEZA<br /><span>EMPIEZA AQUÍ</span></h2><p>Cuéntanos lo esencial. Te responderemos por WhatsApp con una orientación inicial.</p></Reveal>
      <Reveal className="quote-form-wrap" delay={0.1}>
        {sent ? (
          <div className="success" role="status"><CheckCircle size={42} weight="light" /><h3>Solicitud preparada</h3><p>WhatsApp se abrió con los datos de tu idea. Solo falta enviarlos.</p><button type="button" onClick={() => setSent(false)}>Enviar otra consulta</button></div>
        ) : (
          <form className="quote-form" onSubmit={submit}>
            <input type="hidden" name="portfolioDesign" value={requestedDesign} />
            <label>Tu nombre<input name="name" required autoComplete="name" placeholder="Nombre y apellido" /></label>
            <label>Estilo<select name="style" defaultValue={initialStyle}><option value="" disabled>Selecciona un estilo</option><option>Blackwork</option><option>Fine line</option><option>Realismo</option><option>Geométrico</option><option>Aún no lo sé</option></select></label>
            <label>Zona del cuerpo<input name="zone" required placeholder="Ej. antebrazo" /></label>
            <div className="date-time-field"><span>Fecha y hora</span><DateTimePicker error={dateError} onChange={(value) => { setDesiredDate(value); setDateError(""); }} /></div>
            <label className="full">Imagen de referencia<input name="referenceUrl" type="url" inputMode="url" placeholder="https://..." /></label>
            <label className="full">Cuéntanos tu idea<textarea name="idea" required rows={3} placeholder={requestedDesign ? `Cuéntanos qué te gustó de ${requestedDesign}` : "Concepto, tamaño aproximado y referencias"} /></label>
            <button className="submit-button" type="submit"><span>Cotizar por WhatsApp</span><ArrowRight size={20} weight="bold" /></button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
