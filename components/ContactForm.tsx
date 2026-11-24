"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

type F = "name" | "email" | "subject" | "message";

export default function ContactForm() {
  const [v, setV] = useState<Record<F, string>>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<F, string>>>({});
  const [sent, setSent] = useState(false);

  const input = (k: F) =>
    cn(
      "w-full rounded-xl border bg-mint/50 px-4 text-navy outline-none transition focus:bg-white",
      errors[k] ? "border-red-400" : "border-line focus:border-fresh",
    );

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div key="sent" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full flex-col items-center justify-center rounded-[1.75rem] bg-mint p-10 text-center" role="status">
          <CheckCircle2 className="h-14 w-14 text-fresh" />
          <h2 className="mt-4 font-display text-2xl font-semibold text-navy">Thanks for reaching out!</h2>
          <p className="mt-2 max-w-sm text-muted">Your message has been noted. (Demo: the contact form is not yet connected to an inbox.)</p>
          <Button variant="outline" className="mt-6" onClick={() => { setSent(false); setV({ name: "", email: "", subject: "", message: "" }); }}>
            Send another message
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0 }}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const er: Partial<Record<F, string>> = {};
            if (v.name.trim().length < 2) er.name = "Please enter your name.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) er.email = "Enter a valid email.";
            if (v.message.trim().length < 10) er.message = "Please write at least 10 characters.";
            setErrors(er);
            // TODO: post to an API route / email service.
            if (!Object.keys(er).length) setSent(true);
          }}
          className="grid gap-4 rounded-[1.75rem] border border-line/70 bg-white p-6 shadow-soft sm:grid-cols-2 sm:p-8"
        >
          {(["name", "email"] as const).map((k) => (
            <div key={k}>
              <label htmlFor={`c-${k}`} className="mb-1.5 block text-sm font-medium text-navy">
                {k === "name" ? "Your name" : "Email"}
              </label>
              <input id={`c-${k}`} type={k === "email" ? "email" : "text"} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!errors[k]} className={cn(input(k), "h-12")} />
              {errors[k] && <p className="mt-1 text-xs text-red-600">{errors[k]}</p>}
            </div>
          ))}
          <div className="sm:col-span-2">
            <label htmlFor="c-subject" className="mb-1.5 block text-sm font-medium text-navy">
              Subject <span className="font-normal text-muted">(optional)</span>
            </label>
            <select id="c-subject" value={v.subject} onChange={(e) => setV({ ...v, subject: e.target.value })} className={cn(input("subject"), "h-12 cursor-pointer")}>
              <option value="">Choose a topic</option>
              <option>Product enquiry</option>
              <option>Order support</option>
              <option>Bulk / business orders</option>
              <option>Distribution & partnerships</option>
              <option>Other</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-navy">
              Message
            </label>
            <textarea id="c-message" rows={5} value={v.message} onChange={(e) => setV({ ...v, message: e.target.value })} aria-invalid={!!errors.message} className={cn(input("message"), "resize-none py-3")} />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Send message <Send className="h-4 w-4" />
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
