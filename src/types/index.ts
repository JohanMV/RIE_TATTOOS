export type TattooStyle = "Todos" | "Blackwork" | "Fine line" | "Realismo" | "Geométrico";

export interface PortfolioPiece {
  id: number;
  title: string;
  style: Exclude<TattooStyle, "Todos">;
  artist: string;
  images: string[];
  position: string;
}

export interface Artist {
  name: string;
  role: string;
  styles: string;
  image: string;
}
