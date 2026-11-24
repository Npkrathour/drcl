import { Home, Building2, HeartHandshake, ArrowRight } from "lucide-react";
import HomeScene from "./HomeScene";
import Reveal from "./ui/Reveal";
import { ButtonLink } from "./ui/Button";

const points = [
  { icon: Home, title: "For every home", text: "Floors, toilets, bathrooms, kitchens and glass — covered." },
  { icon: Building2, title: "For workplaces too", text: "5L packs for offices, shops and larger spaces." },
  { icon: HeartHandshake, title: "Made with care", text: "Clear usage directions on every pack." },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="mx-auto w-full max-w-xl lg:max-w-none">
          <HomeScene />
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">Our story</span>
            <h2 className="heading-lg mt-4">
              More Than Cleaning. <span className="text-gradient">It&apos;s About Care.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              At DRCL, we believe a clean environment creates a healthier and happier lifestyle. Our cleaning solutions are
              designed to help homes and workplaces maintain cleanliness with convenience and confidence.
            </p>
          </Reveal>

          <ul className="mt-9 space-y-4">
            {points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 + i * 0.08}>
                <div className="group flex gap-4 rounded-2xl border border-line/70 bg-white p-4 transition-all duration-300 hover:border-fresh/40 hover:shadow-soft">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-fresh-100 text-fresh-600 transition-transform duration-300 group-hover:scale-110">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display font-semibold text-navy">{p.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{p.text}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.35} className="mt-9">
            <ButtonLink href="/about" variant="secondary">
              Read our story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
