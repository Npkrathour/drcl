"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingCart, Truck, Zap, Droplets, Package, Info } from "lucide-react";
import { getCategory, type Product, type SizeLabel } from "@/lib/products";
import { cartActions } from "@/lib/cart";
import { site } from "@/lib/site";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "./ui/Button";
import { SizePicker } from "./ProductCard";
import QuantitySelector from "./QuantitySelector";
import Rating from "./Rating";
import { Bubbles } from "./Effects";

const imageLabels = ["Front", "Label", "Pack sizes"];

function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="lg:sticky lg:top-28">
      <div
        className="relative aspect-square overflow-hidden rounded-[2rem] border border-line/60"
        style={{ background: product.tint }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
      >
        <div aria-hidden className="absolute top-1/2 left-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60" />
        <Bubbles count={7} seed={product.slug.length} />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.94, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: -30 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center p-8 sm:p-12"
          >
            <motion.div
              className="h-full w-full"
              animate={active === 0 ? { y: [0, -10, 0] } : undefined}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={product.images[active]}
                alt={`${product.name} — ${imageLabels[active] ?? "image"}`}
                width={800}
                height={800}
                priority
                className="h-full w-full object-contain transition-transform duration-300 ease-out"
                style={zoom ? { transform: "scale(1.6)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <span className="absolute top-5 left-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm">
          {getCategory(product.category)?.name}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {product.images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${imageLabels[i] ?? `image ${i + 1}`}`}
            aria-current={i === active}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-2xl border-2 transition-all",
              i === active ? "border-fresh shadow-soft" : "border-transparent opacity-70 hover:opacity-100",
            )}
            style={{ background: product.tint }}
          >
            <Image src={src} alt="" width={240} height={180} className="h-full w-full object-contain p-2" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const [size, setSize] = useState<SizeLabel>((product.sizes.find((s) => s.label === "1L") ?? product.sizes[0]).label);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = product.sizes.find((s) => s.label === size)!.price;

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <Gallery product={product} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <span className="eyebrow">{product.fragrance} fragrance</span>
        <h1 className="mt-4 font-display text-3xl leading-tight font-semibold text-navy sm:text-4xl">{product.name}</h1>
        <Rating rating={product.rating} className="mt-3" />
        <p className="mt-5 text-lg leading-relaxed text-muted">{product.description}</p>

        <div className="mt-7 flex items-baseline gap-3">
          <motion.span key={`${size}-${qty}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl font-semibold text-navy">
            {formatPrice(price * qty)}
          </motion.span>
          {qty > 1 && <span className="text-sm text-muted">{formatPrice(price)} each</span>}
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <p className="mb-3 text-sm font-semibold text-navy">Size</p>
            <SizePicker product={product} value={size} onChange={setSize} size="lg" />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-navy">Quantity</p>
            <QuantitySelector value={qty} onChange={setQty} />
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              cartActions.add(product.slug, size, qty);
              setAdded(true);
              setTimeout(() => setAdded(false), 1800);
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span key="ok" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} className="flex items-center gap-2">
                  <Check className="h-5 w-5" /> Added
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          <Button
            size="lg"
            onClick={() => {
              cartActions.add(product.slug, size, qty, { silent: true });
              router.push("/checkout");
            }}
          >
            <Zap className="h-5 w-5" /> Buy Now
          </Button>
        </div>

        <ul className="mt-8 grid gap-3 rounded-2xl border border-line/70 bg-mint/60 p-5 text-sm text-charcoal/80 sm:grid-cols-2">
          <li className="flex items-center gap-2.5">
            <Truck className="h-4 w-4 text-fresh" /> Free shipping over {formatPrice(site.freeShippingThreshold)}
          </li>
          <li className="flex items-center gap-2.5">
            <Package className="h-4 w-4 text-fresh" /> Available in {product.sizes.map((s) => s.label).join(" · ")}
          </li>
        </ul>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-semibold text-navy">Highlights</h2>
            <ul className="mt-4 space-y-3">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-charcoal/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-fresh-100 text-fresh-600">
                    <Check className="h-3 w-3" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-navy">How to use</h2>
            <ol className="mt-4 space-y-3">
              {product.howToUse.map((step, i) => (
                <li key={step} className="flex items-start gap-2.5 text-sm text-charcoal/80">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy text-[0.65rem] font-bold text-white">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="mt-8 flex items-start gap-2 text-xs text-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Read the label before use. Keep out of reach of children. Do not mix with other cleaning products.
        </p>
        <p className="mt-2 flex items-start gap-2 text-xs text-muted">
          <Droplets className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Product images are illustrative.
        </p>
      </motion.div>
    </div>
  );
}
