"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Info, Quote } from "lucide-react";
import { SectionHeading } from "./ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * DEMO CONTENT — these are placeholder reviews written for layout purposes.
 * Replace with real, verified customer feedback before launch.
 */
const demoReviews = [
  {
    quote: "The floor cleaner's citrus fragrance stays in the room long after mopping. The 5L pack is handy for our family.",
    name: "Sample Customer A",
    role: "Demo review · Floor Cleaner",
  },
  {
    quote: "The angled nozzle on the toilet cleaner makes it much easier to reach under the rim. Simple and effective.",
    name: "Sample Customer B",
    role: "Demo review · Toilet Cleaner",
  },
  {
    quote: "I keep the multi-purpose spray in the kitchen and use it every day. The lavender smell is lovely.",
    name: "Sample Customer C",
    role: "Demo review · Multi-Purpose Cleaner",
  },
  {
    quote: "Mirrors and windows come out clear with the glass cleaner. Nice-looking bottle on the shelf too.",
    name: "Sample Customer D",
    role: "Demo review · Glass Cleaner",
  },
];

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const go = useCallback(
    (step: number) => setState(([i]) => [(i + step + demoReviews.length) % demoReviews.length, step]),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [paused, go]);

  const review = demoReviews[index];

  return (
    <section className="bg-mint-gradient relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Testimonials" title="What our customers say" />
        <p className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 rounded-full border border-amber-300/60 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-800">
          <Info className="h-4 w-4 shrink-0" />
          Demo content — sample reviews shown until real customer feedback is available.
        </p>

        <div
          className="relative mx-auto mt-12 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] bg-white p-8 shadow-lift sm:min-h-[260px] sm:p-12">
            <Quote aria-hidden className="absolute top-6 right-8 h-20 w-20 text-fresh/10" />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="relative cursor-grab active:cursor-grabbing"
              >
                <blockquote className="font-display text-xl leading-relaxed text-navy sm:text-2xl">“{review.quote}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-navy font-display font-semibold text-white">
                    {review.name.slice(-1)}
                  </span>
                  <span>
                    <span className="block font-semibold text-navy">{review.name}</span>
                    <span className="block text-sm text-muted">{review.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {demoReviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show review ${i + 1}`}
                  aria-current={i === index}
                  className={cn("h-2 rounded-full transition-all duration-500", i === index ? "w-8 bg-fresh" : "w-2 bg-navy/20 hover:bg-navy/40")}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
