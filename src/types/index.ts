export type TattooStyle = "Todos" | "Blackwork" | "Fine line" | "Realismo" | "Geométrico" | "Anime";

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

export type ProductCategoryId = "aftercare" | "protection" | "equipment" | "supplies";

export interface Product {
  id: string;
  name: string;
  category: ProductCategoryId;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  sourceUrl: string;
}

export interface ProductCategory {
  id: ProductCategoryId;
  label: string;
  products: Product[];
}
