import type { Artist, PortfolioPiece, TattooStyle } from "@/types";

export const whatsappNumber = "51999999999";

export const navItems = [
  ["Inicio", "#inicio"],
  ["Portafolio", "#portafolio"],
  ["Artistas", "#artistas"],
  ["Estilos", "#estilos"],
  ["Estudio", "#estudio"],
  ["Cuidados", "#cuidados"],
] as const;

export const filters: TattooStyle[] = ["Todos", "Blackwork", "Fine line", "Realismo", "Geométrico", "Anime"];

export const portfolio: PortfolioPiece[] = [
  { id: 1, title: "Geometría viva", style: "Geométrico", artist: "Mateo Salazar", images: ["/images/tatuaje_geometrico_2.webp", "/images/tatuaje_geometrico_3.webp", "/images/tatuaje_geometrico_1.webp"], position: "Brazo" },
  { id: 2, title: "Cóndor ancestral", style: "Blackwork", artist: "Mateo Salazar", images: ["/images/tattoo-hero.jpg", "/images/portfolio-blackwork-02.webp", "/images/portfolio-blackwork-03.webp"], position: "Hombro" },
  { id: 3, title: "Ritual de tinta", style: "Realismo", artist: "Valeria Cruz", images: ["/images/tatuaje_realista.webp", "/images/tatuaje_realista_2.webp", "/images/tatuaje_realista_3.webp"], position: "Antebrazo" },
  { id: 4, title: "Trama botánica", style: "Fine line", artist: "Alonso Ríos", images: ["/images/tattoo-detail.jpg", "/images/portfolio-fineline-02.webp", "/images/portfolio-fineline-03.webp"], position: "Pantorrilla" },
  { id: 5, title: "Colección anime", style: "Anime", artist: "TATTOO PERÚ", images: ["/images/tatto_anime_1.webp", "/images/tatto_anime_2.webp", "/images/tatto_anime_3.webp"], position: "Diseño anime" },
];

export const artists: Artist[] = [
  { name: "Mateo Salazar", role: "Artista residente", styles: "Blackwork y geometría", image: "/images/tattoo-artist.jpg" },
  { name: "Valeria Cruz", role: "Artista residente", styles: "Realismo y microrealismo", image: "/images/tattoo-hero.jpg" },
];
