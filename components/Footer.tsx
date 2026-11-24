import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { WhatsAppIcon, whatsappUrl } from "./WhatsApp";
import { categories } from "@/lib/products";
import { navLinks, site } from "@/lib/site";

type SocialKey = keyof typeof site.social;

const socialIcons: Record<SocialKey, { label: string; path: string }> = {
  instagram: {
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 4.9a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.1-9.4a1.1 1.1 0 1 0 0 2.3 1.1 1.1 0 0 0 0-2.3z",
  },
  facebook: {
    label: "Facebook",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z",
  },
  youtube: {
    label: "YouTube",
    path: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z",
  },
  x: {
    label: "X",
    path: "M17.8 3h3.1l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.5 21H2.4l7.2-8.2L2 3h6.3l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z",
  },
};

function ContactLine({ icon: Icon, value, href }: { icon: typeof Mail; value: string; href?: string }) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-fresh" />
      {value ? (
        href ? (
          <a href={href} className="hover:text-white">
            {value}
          </a>
        ) : (
          <span>{value}</span>
        )
      ) : (
        <span className="text-white/40 italic">To be announced</span>
      )}
    </li>
  );
}

export default function Footer() {
  const year = 2026;
  return (
    <footer className="bg-navy-gradient relative overflow-hidden text-white/70">
      <div aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1" />
      <div aria-hidden className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-fresh/10 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:py-20">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{site.description}</p>
          <p className="mt-4 font-display text-sm font-medium text-fresh">{site.tagline}</p>
          <ul className="mt-6 flex gap-2.5">
            {(Object.keys(socialIcons) as SocialKey[]).map((key) => {
              const url = site.social[key];
              const icon = socialIcons[key];
              const cls =
                "grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-fresh hover:bg-fresh hover:text-white";
              const svg = (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d={icon.path} />
                </svg>
              );
              return (
                <li key={key}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={icon.label} className={cls}>
                      {svg}
                    </a>
                  ) : (
                    <span title={`${icon.label} — coming soon`} aria-label={`${icon.label} (coming soon)`} className={`${cls} cursor-default opacity-60`}>
                      {svg}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wider text-white uppercase">Quick Links</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[...navLinks, { href: "/cart", label: "Cart" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-fresh">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wider text-white uppercase">Product Categories</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products?category=${c.slug}`} className="transition-colors hover:text-fresh">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wider text-white uppercase">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <ContactLine icon={Mail} value={site.contact.email} href={site.contact.email ? `mailto:${site.contact.email}` : undefined} />
            <ContactLine icon={Phone} value={site.contact.phone} href={site.contact.phone ? `tel:${site.contact.phone.replace(/\s/g, "")}` : undefined} />
            <li className="flex items-start gap-3">
              <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#25d366]" />
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp Business: {site.contact.phone}
                </a>
              ) : (
                <span className="text-white/40 italic">To be announced</span>
              )}
            </li>
            <ContactLine icon={MapPin} value={site.contact.address} />
          </ul>
          <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-fresh hover:underline">
            Send us a message →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs sm:flex-row">
          <p>© {year} DRCL. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
