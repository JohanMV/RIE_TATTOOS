import { Footer, Navbar } from "@/components/layout";
import { Artists, Care, Hero, Portfolio, Process, Quote, Studio, Styles } from "@/components/sections";
import { PortfolioPage } from "@/features/portfolio/components/PortfolioPage";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/portafolio") {
    return <PortfolioPage />;
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
        <Quote />
      </main>
      <Footer />
    </div>
  );
}
