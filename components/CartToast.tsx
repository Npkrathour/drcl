"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { cartActions, useCartState } from "@/lib/cart";

export default function CartToast() {
  const { toast } = useCartState();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => cartActions.dismissToast(), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-[80] flex justify-center px-4 sm:bottom-24 sm:justify-end sm:px-6">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl bg-navy p-3 pl-4 text-white shadow-2xl"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-fresh" />
            <p className="flex-1 text-sm">{toast.message}</p>
            <Link
              href="/cart"
              onClick={() => cartActions.dismissToast()}
              className="rounded-full bg-fresh px-3 py-1.5 text-xs font-semibold whitespace-nowrap hover:bg-fresh-600"
            >
              View cart
            </Link>
            <button type="button" onClick={() => cartActions.dismissToast()} aria-label="Dismiss" className="grid h-7 w-7 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
