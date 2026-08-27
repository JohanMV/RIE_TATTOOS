import { Footer, Navbar } from "@/components/layout";
import { Artists, Care, Hero, Portfolio, Process, Products, Quote, Studio, Styles, TikTok } from "@/components/sections";
import { PortfolioPage } from "@/features/portfolio/components/PortfolioPage";
import { ProductsPage } from "@/features/products/components";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/portafolio") {
    return <PortfolioPage />;
  }

  if (path === "/productos") {
    return <ProductsPage />;
  }

  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Artists />
        <Styles />
        <Studio />
        <Process />
        <Care />
        <Products />
        <TikTok />
        <Quote />
      </main>
      <Footer />
    </div>
  );
}
