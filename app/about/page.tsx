import type { Metadata } from "next";
import { Target, Eye, Sparkles, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description: "DRCL makes reliable cleaning products for homes and workplaces.",
};

const pillars = [
  {
    icon: Target,
    title: "Our mission",
    text: "To make everyday cleaning simpler with reliable products that are easy to use and pleasant to have at home.",
  },
  {
    icon: Eye,
    title: "Our vision",
    text: "A cleaner space and a better life for every household and workplace we serve.",
  },
  {
    icon: Sparkles,
    title: "Our promise",
    text: "Clear labels, honest descriptions and products made for the way people really clean.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "About Us" }]}
        title={
          <>
            A Cleaner Space. <span className="text-gradient">A Better Life.</span>
          </>
        }
        description="DRCL manufactures and sells cleaning products for floors, toilets, bathrooms, kitchens and glass."
      />
      <AboutSection />
      <section className="bg-mint-gradient py-16 sm:py-24">
        <div className="container-x grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="rounded-[1.75rem] bg-white p-8 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-fresh">
                <p.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-navy">{p.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <WhyChooseUs />
      <section className="py-20 text-center">
        <Reveal className="container-x">
          <h2 className="heading-lg">Ready to make every corner shine?</h2>
          <ButtonLink href="/products" size="lg" className="mt-8">
            Shop DRCL products <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
