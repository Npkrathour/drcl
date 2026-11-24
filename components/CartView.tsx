"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/utils";
import { ButtonLink, Button } from "./ui/Button";
import QuantitySelector from "./QuantitySelector";

export function OrderSummary({ cta }: { cta?: React.ReactNode }) {
  const { subtotal, shipping, total, count } = useCart();
  const remaining = site.freeShippingThreshold - subtotal;
  const pct = Math.min(100, (subtotal / site.freeShippingThreshold) * 100);
  return (
    <div className="rounded-[1.75rem] border border-line/70 bg-white p-6 shadow-soft sm:p-7">
      <h2 className="font-display text-xl font-semibold text-navy">Order summary</h2>

      <div className="mt-5 rounded-2xl bg-mint p-4">
        <p className="flex items-center gap-2 text-sm text-charcoal/80">
          <Truck className="h-4 w-4 text-fresh" />
          {remaining > 0 ? (
            <>
              Add <span className="font-semibold text-navy">{formatPrice(remaining)}</span> more for free shipping
            </>
          ) : (
            <span className="font-medium text-fresh-600">You&apos;ve unlocked free shipping!</span>
          )}
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
          <motion.div className="h-full rounded-full bg-fresh" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal ({count} item{count === 1 ? "" : "s"})</dt>
          <dd className="font-medium text-navy">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd className="font-medium text-navy">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-4 text-base">
          <dt className="font-semibold text-navy">Total</dt>
          <dd className="font-display text-xl font-semibold text-navy">{formatPrice(total)}</dd>
        </div>
      </dl>
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
}

export default function CartView() {
  const { lines, setQuantity, remove, clear } = useCart();

  if (lines.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg rounded-[2rem] bg-mint px-6 py-16 text-center">
        <motion.div
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-fresh shadow-soft"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ShoppingBag className="h-9 w-9" />
        </motion.div>
        <h2 className="mt-6 font-display text-2xl font-semibold text-navy">Your cart is empty</h2>
        <p className="mt-2 text-muted">Looks like you haven&apos;t added anything yet. Let&apos;s fix that!</p>
        <ButtonLink href="/products" size="lg" className="mt-8">
          Start shopping <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
      <div>
        <ul className="space-y-4">
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.li
                key={`${line.slug}-${line.size}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex gap-4 rounded-[1.5rem] border border-line/70 bg-white p-4 shadow-soft sm:gap-6 sm:p-5">
                  <Link href={`/products/${line.slug}`} className="grid h-24 w-20 shrink-0 place-items-center rounded-2xl bg-mint sm:h-28 sm:w-24">
                    <Image src={line.image} alt={line.name} width={80} height={112} className="h-[85%] w-auto" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link href={`/products/${line.slug}`} className="font-display font-semibold text-navy hover:text-fresh-600">
                          {line.name}
                        </Link>
                        <p className="mt-0.5 text-sm text-muted">
                          Size: {line.size} · {formatPrice(line.unitPrice)} each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.slug, line.size)}
                        aria-label={`Remove ${line.name} ${line.size}`}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                      <QuantitySelector size="sm" value={line.quantity} onChange={(n) => setQuantity(line.slug, line.size, n)} />
                      <span className="font-display text-lg font-semibold text-navy">{formatPrice(line.lineTotal)}</span>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/products" className="text-sm font-semibold text-fresh-600 hover:underline">
            ← Continue shopping
          </Link>
          <Button variant="ghost" size="sm" onClick={() => clear()} className="text-muted hover:text-red-600">
            <Trash2 className="h-4 w-4" /> Clear cart
          </Button>
        </div>
      </div>

      <div className="lg:sticky lg:top-28">
        <OrderSummary
          cta={
            <ButtonLink href="/checkout" size="lg" className="w-full">
              Proceed to Checkout <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          }
        />
      </div>
    </div>
  );
}
