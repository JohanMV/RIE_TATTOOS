import { useState } from "react";
import { ArrowUpRight, TiktokLogo } from "@phosphor-icons/react";
import { Reveal } from "@/components/ui";

const videos = [
  { id: "7666174346058140949", creator: "@gustavoink0" },
  { id: "7499984509656435974", creator: "@uiliangarcez" },
  { id: "7656438649675975958", creator: "@iris.tatts_" },
  { id: "7541212769689963782", creator: "@vagotattoo" },
  { id: "7430287010687962374", creator: "@eleven.rb" },
] as const;

interface TikTokVideoProps {
  id: string;
  creator: string;
  index: number;
}

function TikTokVideo({ id, creator, index }: TikTokVideoProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const source = `https://www.tiktok.com/player/v1/${id}?controls=1&autoplay=0&loop=0&rel=0&description=0&music_info=0`;
  const originalUrl = `https://www.tiktok.com/${creator}/video/${id}`;

  return (
    <article className="tiktok-video">
      {status === "loading" && <div className="tiktok-loading" aria-hidden="true"><span /></div>}
      {status === "error" ? (
        <div className="tiktok-fallback">
          <TiktokLogo size={28} weight="fill" />
          <p>El video no pudo cargarse.</p>
          <a href={originalUrl} target="_blank" rel="noreferrer">Ver en TikTok <ArrowUpRight size={15} /></a>
        </div>
      ) : (
        <iframe
          src={source}
          title={`Video ${index + 1} de TikTok, ${creator}`}
          loading="lazy"
          allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
          className={status === "ready" ? "tiktok-frame ready" : "tiktok-frame"}
        />
      )}
    </article>
  );
}

export function TikTok() {
  return (
    <section className="section tiktok-section" aria-labelledby="tiktok-title">
      <Reveal className="tiktok-heading">
        <p className="eyebrow">Trabajo en movimiento</p>
        <h2 id="tiktok-title">TINTA QUE<br /><span>COBRA VIDA</span></h2>
        <p>
          Síguenos en <a href="https://www.tiktok.com/@cybersys.pro" target="_blank" rel="noreferrer">TikTok</a> e{" "}
          <a href="https://www.instagram.com/johan_mv2000/" target="_blank" rel="noreferrer">Instagram</a> para ver más.
        </p>
      </Reveal>
      <div className="tiktok-grid" aria-label="Videos de TikTok del trabajo del estudio">
        {videos.map((video, index) => (
          <Reveal key={video.id} delay={index * 0.05}>
            <TikTokVideo {...video} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
