"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { searchProducts, startingPrice } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = searchProducts(query).slice(0, 5);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const close = () => {
    setQuery("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-navy/45 px-4 pt-20 backdrop-blur-sm sm:pt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/products${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
                close();
              }}
              className="flex items-center gap-3 border-b border-line px-5"
            >
              <Search className="h-5 w-5 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search floor cleaner, glass, lemon…"
                className="h-16 flex-1 bg-transparent text-base text-navy outline-none placeholder:text-muted/70"
                aria-label="Search query"
              />
              <button type="button" onClick={close} aria-label="Close search" className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-mint">
                <X className="h-5 w-5" />
              </button>
            </form>
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted">No products match “{query}”.</p>
              ) : (
                <ul>
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={close}
                        className="group flex items-center gap-4 rounded-2xl p-2.5 transition-colors hover:bg-mint"
                      >
                        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl" style={{ background: p.tint }}>
                          <Image src={p.images[0]} alt="" width={40} height={56} className="h-12 w-auto" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium text-navy">{p.name}</span>
                          <span className="block truncate text-sm text-muted">{p.shortDescription}</span>
                        </span>
                        <span className="text-sm font-semibold text-navy">from {formatPrice(startingPrice(p))}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={() => {
                  router.push(`/products${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
                  close();
                }}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold text-fresh-600 hover:bg-mint"
              >
                View all results <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
