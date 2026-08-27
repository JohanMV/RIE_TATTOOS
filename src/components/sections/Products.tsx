import { Button, Reveal } from "@/components/ui";
import { ProductCatalog } from "@/features/products/components";

export function Products() {
  return (
    <section id="productos" className="section products-section" aria-labelledby="products-title">
      <Reveal className="products-heading">
        <h2 id="products-title">PRODUCTOS QUE CUIDAN<br /><span>CADA DETALLE</span></h2>
        <p>Una selección breve para acompañar la piel y el trabajo dentro del estudio.</p>
      </Reveal>
      <ProductCatalog context="home" />
      <div className="products-action">
        <Button href="/productos" variant="secondary" arrow>Ver todos los productos</Button>
      </div>
    </section>
  );
}
