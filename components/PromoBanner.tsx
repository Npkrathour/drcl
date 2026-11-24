"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./ui/Button";
import { Bubbles, Sparkles } from "./Effects";

const bottles = [
  { src: "/images/products/kitchen-cleaner.svg", alt: "DRCL Kitchen Cleaner", cls: "w-[26%] -rotate-6", dur: 5, delay: 0 },
  { src: "/images/products/premium-floor-cleaner.svg", alt: "DRCL Premium Floor Cleaner", cls: "w-[34%] z-10", dur: 5.8, delay: 0.4 },
  { src: "/images/products/multi-purpose-cleaner.svg", alt: "DRCL Multi-Purpose Cleaner", cls: "w-[26%] rotate-6", dur: 5.4, delay: 0.8 },
];

export default function PromoBanner() {
  return (
    <section className="py-10 sm:py-16">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-gradient px-6 py-14 sm:px-12 lg:px-16 lg:py-16">
          <div aria-hidden className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-fresh/25 blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
          <Bubbles count={12} seed={21} />
          <Sparkles
            points={[
              { top: "18%", left: "48%", size: 16, delay: 0.3 },
              { top: "70%", left: "56%", size: 12, delay: 1.4 },
              { top: "12%", left: "92%", size: 18, delay: 2.1 },
            ]}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-fresh uppercase">Your everyday essentials</span>
              <h2 className="mt-5 font-display text-4xl leading-tight font-semibold text-white sm:text-5xl">
                Make Every Corner <span className="text-gradient">Shine!</span>
              </h2>
              <p className="mt-4 max-w-md text-lg text-white/70">Discover your everyday cleaning essentials with DRCL.</p>
              <ButtonLink href="/products" size="lg" className="mt-8">
                Explore Our Collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </motion.div>

            <div className="relative mx-auto flex w-full max-w-lg items-end justify-center">
              <div aria-hidden className="absolute bottom-2 h-10 w-3/4 rounded-[50%] bg-black/30 blur-xl" />
              {bottles.map((b, i) => (
                <motion.div
                  key={b.src}
                  className={`relative -mx-[2%] ${b.cls}`}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, -14, 0], x: [0, i === 1 ? 0 : i === 0 ? -4 : 4, 0] }}
                    transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image src={b.src} alt={b.alt} width={400} height={560} className="h-auto w-full drop-shadow-2xl" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
