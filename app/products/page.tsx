import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import ShopCatalog from "@/components/ShopCatalog";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Buy DRCL floor cleaner, toilet cleaner, phenyl, bathroom, kitchen, glass and multi-purpose cleaners in Powayan and Shahjahanpur, Uttar Pradesh.",
  alternates: { canonical: "/products" },
};

function CatalogFallback() {
  return (
    <div className="mt-28 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Products" }]}
        title={
          <>
            Shop <span className="text-gradient">DRCL</span>
          </>
        }
        description="Reliable cleaning essentials for every corner of your home — in 500ml, 1L and 5L packs."
      />
      <div className="container-x pb-24">
        <Suspense fallback={<CatalogFallback />}>
          <ShopCatalog />
        </Suspense>
      </div>
    </>
  );
}
