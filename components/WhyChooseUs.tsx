"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { Sparkles, Flower2, ShieldCheck, BadgeCheck, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./ui/Reveal";
import { Blob } from "./Effects";

const features: { icon: LucideIcon; title: string; text: string; color: string; animate: TargetAndTransition }[] = [
  {
    icon: Sparkles,
    title: "Powerful Cleaning",
    text: "Formulas made for the everyday dirt and grime of busy Indian homes.",
    color: "#32B768",
    animate: { rotate: [0, 14, -10, 0], scale: [1, 1.12, 1] },
  },
  {
    icon: Flower2,
    title: "Fresh Fragrance",
    text: "Citrus, lavender, aqua and lemon notes that leave every room smelling fresh.",
    color: "#6A5ACD",
    animate: { rotate: [0, 90, 180], scale: [1, 1.08, 1] },
  },
  {
    icon: ShieldCheck,
    title: "Everyday Hygiene",
    text: "A dedicated product for each surface makes a regular cleaning routine easy.",
    color: "#2E86CC",
    animate: { y: [0, -4, 0], scale: [1, 1.06, 1] },
  },
  {
    icon: BadgeCheck,
    title: "Quality You Can Trust",
    text: "Clear labels, clear usage directions and sizes for every household.",
    color: "#E09B1B",
    animate: { rotateY: [0, 180, 360] },
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-drcl" className="bg-navy-gradient relative overflow-hidden py-16 text-white sm:py-24 lg:py-28">
      <Blob className="-top-40 -left-32 h-[420px] w-[420px] bg-fresh/20" />
      <Blob className="-right-32 -bottom-40 h-[420px] w-[420px] bg-sky-400/15" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="container-x relative">
        <div className="[--eyebrow-bg:none] [&_.eyebrow]:border-white/10 [&_.eyebrow]:bg-white/10 [&_.eyebrow]:text-fresh [&_h2]:text-white [&_p]:text-white/65">
          <SectionHeading
            eyebrow="Why DRCL"
            title="Clean that you can see — and feel"
            description="We focus on the basics that matter: products that work, smell fresh and are simple to use."
          />
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.08] sm:p-7"
            >
              <div
                aria-hidden
                className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-40"
                style={{ background: f.color }}
              />
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `${f.color}22`, color: f.color }}>
                <motion.span
                  className="grid place-items-center"
                  animate={f.animate}
                  transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.2 + i * 0.3, ease: "easeInOut" }}
                >
                  <f.icon className="h-7 w-7" strokeWidth={1.8} />
                </motion.span>
              </div>
              <h3 className="relative mt-5 font-display text-xl font-semibold sm:mt-6">{f.title}</h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-white/65">{f.text}</p>
              <span className="relative mt-6 block h-0.5 w-10 rounded-full transition-all duration-500 group-hover:w-20" style={{ background: f.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
