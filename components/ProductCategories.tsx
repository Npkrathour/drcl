"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/products";
import { SectionHeading } from "./ui/Reveal";

export default function ProductCategories() {
  return (
    <section id="categories" className="relative py-16 sm:py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Shop by category"
          title={
            <>
              Everything your home needs to <span className="text-gradient">shine</span>
            </>
          }
          description="From the floor to the window panes — pick the right DRCL solution for every corner of your home."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                style={{ "--accent": cat.accent } as React.CSSProperties}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line/60 bg-white p-2 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--accent)_35%,transparent)] hover:shadow-lift"
              >
                <div
                  className="relative h-36 overflow-hidden rounded-[1.4rem] sm:h-52"
                  style={{ background: `radial-gradient(circle at 70% 80%, #ffffff 0%, ${cat.tint} 60%)` }}
                >
                  <div aria-hidden className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/50 transition-transform duration-700 group-hover:scale-125" />
                  <div aria-hidden className="absolute -top-8 -left-8 h-24 w-24 rounded-full bg-white/40 transition-transform duration-700 group-hover:scale-150" />
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={400}
                    height={560}
                    className="relative mx-auto h-full w-auto py-4 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-[-3deg]"
                  />
                  <span className="absolute top-3 left-3 grid h-7 min-w-7 place-items-center rounded-full bg-[var(--accent)] px-2 text-[0.7rem] font-semibold text-white shadow-sm sm:h-8 sm:min-w-8 sm:text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-2 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4">
                  <h3 className="font-display text-[0.95rem] leading-snug font-semibold text-navy transition-colors group-hover:text-[var(--accent)] sm:text-lg">{cat.name}</h3>
                  <p className="mt-1.5 hidden text-sm leading-relaxed text-muted sm:block">{cat.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-fresh-600 sm:gap-1.5 sm:pt-4 sm:text-sm">
                    Explore Products
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
