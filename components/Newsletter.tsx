"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Send } from "lucide-react";
import { Button } from "./ui/Button";
import { Bubbles } from "./Effects";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-fresh/20 bg-[linear-gradient(135deg,#E3F5EA_0%,#F3F8F5_50%,#E4F1FB_100%)] px-6 py-14 text-center sm:px-12">
          <Bubbles count={10} seed={5} />
          <div className="relative mx-auto max-w-xl">
            <motion.span
              className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-fresh shadow-soft"
              animate={{ y: [0, -6, 0], rotate: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mail className="h-6 w-6" />
            </motion.span>
            <h2 className="heading-lg mt-6">Stay Fresh with DRCL</h2>
            <p className="mt-3 text-muted">Get updates about new products, offers, and cleaning tips.</p>

            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-medium text-navy shadow-soft"
                  role="status"
                >
                  <Check className="h-5 w-5 text-fresh" /> Thanks! You&apos;re on the list.
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, scale: 0.95 }}
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: connect to an email marketing provider / API route.
                    setStatus(EMAIL_RE.test(email.trim()) ? "done" : "error");
                  }}
                  className="mx-auto mt-8 max-w-md"
                >
                  <div className="flex flex-col gap-2 rounded-[1.5rem] bg-white p-2 shadow-soft sm:flex-row sm:rounded-full">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="Enter your email address"
                      aria-invalid={status === "error"}
                      aria-describedby={status === "error" ? "newsletter-error" : undefined}
                      className="h-12 flex-1 rounded-full bg-transparent px-5 text-navy outline-none placeholder:text-muted/70"
                    />
                    <Button type="submit" className="h-12">
                      Subscribe <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  {status === "error" && (
                    <p id="newsletter-error" className="mt-3 text-sm text-red-600">
                      Please enter a valid email address.
                    </p>
                  )}
                  <p className="mt-3 text-xs text-muted">No spam. Unsubscribe any time.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
