"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X, PackageSearch } from "lucide-react";
import { categories, products, searchProducts, startingPrice, type CategorySlug } from "@/lib/products";
import ProductCard from "./ProductCard";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

const sorts = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  name: "Name: A–Z",
} as const;
type SortKey = keyof typeof sorts;

export default function ShopCatalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = (params.get("category") ?? "all") as CategorySlug | "all";
  const sort = (params.get("sort") ?? "featured") as SortKey;
  const urlQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);

  // Keep the input in sync when the URL query changes from elsewhere (e.g. navbar search).
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    setQuery(urlQuery);
  }

  const update = (next: Record<string, string | null>) => {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (!v || v === "all" || (k === "sort" && v === "featured")) sp.delete(k);
      else sp.set(k, v);
    }
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const results = useMemo(() => {
    let list = searchProducts(query, products);
    if (category !== "all") list = list.filter((p) => p.category === category);
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => startingPrice(a) - startingPrice(b));
    if (sort === "price-desc") sorted.sort((a, b) => startingPrice(b) - startingPrice(a));
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured") sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [query, category, sort]);

  const filtersActive = category !== "all" || query.trim() !== "" || sort !== "featured";

  return (
    <div>
      {/* Toolbar */}
      <div className="sticky top-[4.5rem] z-30 -mx-4 border-b border-line/70 bg-white/90 px-4 py-4 backdrop-blur-xl sm:top-20 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <form
            className="relative flex-1"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              update({ q: query.trim() || null });
            }}
          >
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => query.trim() !== urlQuery && update({ q: query.trim() || null })}
              placeholder="Search products…"
              aria-label="Search products"
              className="h-11 w-full rounded-full border border-line bg-mint/60 pr-10 pl-11 text-sm text-navy outline-none transition focus:border-fresh focus:bg-white"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  update({ q: null });
                }}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-line"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>
          <label className="flex items-center gap-2 text-sm text-muted">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only md:not-sr-only">Sort</span>
            <select
              value={sort}
              onChange={(e) => update({ sort: e.target.value })}
              className="h-11 flex-1 cursor-pointer rounded-full border border-line bg-white px-4 text-sm font-medium text-navy outline-none focus:border-fresh md:flex-none"
            >
              {Object.entries(sorts).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
          {[{ slug: "all", name: "All Products" }, ...categories].map((c) => {
            const active = c.slug === category;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => update({ category: c.slug })}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-white" : "bg-mint text-charcoal/75 hover:bg-fresh-100 hover:text-navy",
                )}
              >
                {active && (
                  <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-muted">
        <p>
          Showing <span className="font-semibold text-navy">{results.length}</span> product{results.length === 1 ? "" : "s"}
        </p>
        {filtersActive && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              router.replace(pathname, { scroll: false });
            }}
            className="font-medium text-fresh-600 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {results.length > 0 ? (
          <motion.div key="grid" layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((p, i) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                <ProductCard product={p} index={i} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10 rounded-[2rem] bg-mint px-6 py-16 text-center">
            <PackageSearch className="mx-auto h-12 w-12 text-fresh" />
            <h2 className="mt-4 font-display text-xl font-semibold text-navy">No products found</h2>
            <p className="mt-2 text-sm text-muted">Try a different search term or category.</p>
            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => {
                setQuery("");
                router.replace(pathname, { scroll: false });
              }}
            >
              Show all products
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
