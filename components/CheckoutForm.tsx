"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, Lock, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, cn } from "@/lib/utils";
import { Button, ButtonLink } from "./ui/Button";
import { OrderSummary } from "./CartView";

type Fields = "name" | "phone" | "email" | "address" | "city" | "state" | "pincode";

const fieldDefs: { key: Fields; label: string; type?: string; autoComplete: string; span?: boolean; placeholder?: string }[] = [
  { key: "name", label: "Full name", autoComplete: "name", span: true },
  { key: "phone", label: "Mobile number", type: "tel", autoComplete: "tel", placeholder: "10-digit mobile number" },
  { key: "email", label: "Email", type: "email", autoComplete: "email" },
  { key: "address", label: "Address", autoComplete: "street-address", span: true, placeholder: "House no., street, area" },
  { key: "city", label: "City", autoComplete: "address-level2" },
  { key: "state", label: "State", autoComplete: "address-level1" },
  { key: "pincode", label: "PIN code", autoComplete: "postal-code", placeholder: "6-digit PIN" },
];

function validate(v: Record<Fields, string>) {
  const e: Partial<Record<Fields, string>> = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[6-9]\d{9}$/.test(v.phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a valid 10-digit mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.address.trim().length < 6) e.address = "Please enter your full address.";
  if (!v.city.trim()) e.city = "Required.";
  if (!v.state.trim()) e.state = "Required.";
  if (!/^\d{6}$/.test(v.pincode.trim())) e.pincode = "Enter a 6-digit PIN code.";
  return e;
}

export default function CheckoutForm() {
  const cart = useCart();
  const [values, setValues] = useState<Record<Fields, string>>({ name: "", phone: "", email: "", address: "", city: "", state: "", pincode: "" });
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [payment, setPayment] = useState<"cod" | "online">("cod");
  const [order, setOrder] = useState<{ ref: string; total: number; name: string } | null>(null);

  if (order) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-xl rounded-[2rem] bg-mint px-6 py-14 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}>
          <CheckCircle2 className="mx-auto h-16 w-16 text-fresh" />
        </motion.div>
        <h2 className="mt-5 font-display text-2xl font-semibold text-navy">Thank you, {order.name.split(" ")[0]}!</h2>
        <p className="mt-2 text-muted">
          Order reference <span className="font-semibold text-navy">{order.ref}</span> · {formatPrice(order.total)}
        </p>
        <p className="mx-auto mt-5 flex max-w-md items-start gap-2 rounded-2xl border border-amber-300/60 bg-amber-50 p-3 text-left text-xs text-amber-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          Demo checkout: order processing and payments are not connected yet, so no order has been placed and nothing was charged.
        </p>
        <ButtonLink href="/products" size="lg" className="mt-8">
          Continue shopping <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </motion.div>
    );
  }

  if (cart.lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-[2rem] bg-mint px-6 py-14 text-center">
        <h2 className="font-display text-2xl font-semibold text-navy">Nothing to check out</h2>
        <p className="mt-2 text-muted">Your cart is empty.</p>
        <ButtonLink href="/products" size="lg" className="mt-8">
          Browse products
        </ButtonLink>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const errs = validate(values);
        setErrors(errs);
        if (Object.keys(errs).length) {
          document.getElementById(`co-${Object.keys(errs)[0]}`)?.focus();
          return;
        }
        // TODO: send order to backend / payment gateway.
        setOrder({ ref: `DRCL-${Date.now().toString(36).toUpperCase()}`, total: cart.total, name: values.name });
        cart.clear();
      }}
      className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start"
    >
      <div className="space-y-8">
        <section className="rounded-[1.75rem] border border-line/70 bg-white p-6 shadow-soft sm:p-8">
          <h2 className="font-display text-xl font-semibold text-navy">Delivery details</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {fieldDefs.map((f) => (
              <div key={f.key} className={cn(f.span && "sm:col-span-2")}>
                <label htmlFor={`co-${f.key}`} className="mb-1.5 block text-sm font-medium text-navy">
                  {f.label}
                </label>
                <input
                  id={`co-${f.key}`}
                  type={f.type ?? "text"}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  value={values[f.key]}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, [f.key]: e.target.value }));
                    if (errors[f.key]) setErrors((er) => ({ ...er, [f.key]: undefined }));
                  }}
                  aria-invalid={!!errors[f.key]}
                  aria-describedby={errors[f.key] ? `co-${f.key}-err` : undefined}
                  className={cn(
                    "h-12 w-full rounded-xl border bg-mint/50 px-4 text-navy outline-none transition focus:bg-white",
                    errors[f.key] ? "border-red-400 focus:border-red-500" : "border-line focus:border-fresh",
                  )}
                />
                <AnimatePresence>
                  {errors[f.key] && (
                    <motion.p id={`co-${f.key}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-xs text-red-600">
                      {errors[f.key]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-line/70 bg-white p-6 shadow-soft sm:p-8">
          <h2 className="font-display text-xl font-semibold text-navy">Payment</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Payment method">
            {[
              { id: "cod" as const, title: "Cash on Delivery", text: "Pay when your order arrives." },
              { id: "online" as const, title: "UPI / Card / Netbanking", text: "Online payments coming soon." },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={payment === m.id}
                disabled={m.id === "online"}
                onClick={() => setPayment(m.id)}
                className={cn(
                  "rounded-2xl border-2 p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50",
                  payment === m.id ? "border-fresh bg-fresh-100/50" : "border-line hover:border-navy/30",
                )}
              >
                <span className="block font-semibold text-navy">{m.title}</span>
                <span className="mt-0.5 block text-sm text-muted">{m.text}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-4 lg:sticky lg:top-28">
        <div className="rounded-[1.75rem] border border-line/70 bg-white p-5 shadow-soft">
          <ul className="space-y-3">
            {cart.lines.map((l) => (
              <li key={`${l.slug}-${l.size}`} className="flex items-center gap-3">
                <span className="relative grid h-14 w-12 shrink-0 place-items-center rounded-xl bg-mint">
                  <Image src={l.image} alt="" width={40} height={56} className="h-11 w-auto" />
                  <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-navy px-1 text-[0.65rem] font-bold text-white">{l.quantity}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-navy">{l.name}</span>
                  <span className="text-xs text-muted">{l.size}</span>
                </span>
                <span className="text-sm font-semibold text-navy">{formatPrice(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
        </div>
        <OrderSummary
          cta={
            <>
              <Button type="submit" size="lg" className="w-full">
                <Lock className="h-4 w-4" /> Place Order · {formatPrice(cart.total)}
              </Button>
              <p className="mt-3 text-center text-xs text-muted">Demo checkout — payments are not connected yet.</p>
            </>
          }
        />
      </div>
    </form>
  );
}
