"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Zap } from "lucide-react";
import { getCategory, type Product, type SizeLabel } from "@/lib/products";
import { cartActions } from "@/lib/cart";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import Rating from "./Rating";

export function SizePicker({
  product,
  value,
  onChange,
  size = "sm",
}: {
  product: Product;
  value: SizeLabel;
  onChange: (s: SizeLabel) => void;
  size?: "sm" | "lg";
}) {
  return (
    <div role="radiogroup" aria-label="Choose size" className="flex flex-wrap gap-2">
      {product.sizes.map((s) => {
        const active = s.label === value;
        return (
          <button
            key={s.label}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(s.label)}
            className={cn(
              "rounded-full border font-medium transition-all",
              size === "sm" ? "px-3 py-1 text-xs" : "px-5 py-2.5 text-sm",
              active
                ? "border-navy bg-navy text-white shadow-soft"
                : "border-line bg-white text-charcoal/80 hover:border-navy/40 hover:text-navy",
            )}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const router = useRouter();
  const defaultSize = product.sizes.find((s) => s.label === "1L") ?? product.sizes[0];
  const [size, setSize] = useState<SizeLabel>(defaultSize.label);
  const price = product.sizes.find((s) => s.label === size)!.price;
  const href = `/products/${product.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      style={{ "--accent": product.accent } as React.CSSProperties}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line/70 bg-white shadow-soft transition-[box-shadow,border-color] duration-500 hover:border-[color-mix(in_srgb,var(--accent)_35%,transparent)] hover:shadow-lift"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100" />
      <Link
        href={href}
        className="relative block aspect-[5/4] overflow-hidden sm:aspect-square"
        style={{ background: `radial-gradient(circle at 50% 40%, #ffffff 0%, ${product.tint} 65%)` }}
        aria-label={product.name}
      >
        <div aria-hidden className="absolute inset-x-8 bottom-6 h-10 rounded-[50%] bg-navy/10 blur-xl transition-transform duration-700 group-hover:scale-x-75" />
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 transition-transform duration-700 group-hover:scale-110"
        />
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={560}
          className="relative mx-auto h-full w-auto py-5 transition-transform sm:py-6 duration-700 ease-out group-hover:scale-[1.08] group-hover:-rotate-2"
        />
        <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-navy uppercase shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          {getCategory(product.category)?.name}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <Rating rating={product.rating} />
        <h3 className="mt-2 font-display text-lg font-semibold text-navy">
          <Link href={href} className="transition-colors hover:text-[var(--accent)]">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{product.shortDescription}</p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <SizePicker product={product} value={size} onChange={setSize} />
        </div>

        <div className="mt-5 flex items-baseline gap-2">
          <motion.span key={price} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-2xl font-semibold text-navy">
            {formatPrice(price)}
          </motion.span>
          <span className="text-xs text-muted">per {size} pack</span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button variant="outline" size="sm" className="h-10" onClick={() => cartActions.add(product.slug, size)}>
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </Button>
          <Button
            size="sm"
            className="h-10"
            onClick={() => {
              cartActions.add(product.slug, size, 1, { silent: true });
              router.push("/checkout");
            }}
          >
            <Zap className="h-4 w-4" /> Buy Now
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
