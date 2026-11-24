import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Bubbles } from "./Effects";

export default function PageHeader({
  title,
  description,
  crumbs,
}: {
  title: React.ReactNode;
  description?: string;
  crumbs: { href?: string; label: string }[];
}) {
  return (
    <section className="relative -mt-[4.5rem] overflow-hidden bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(25,167,160,0.14),transparent_70%),linear-gradient(180deg,#E8F6EE_0%,#F3F8F5_60%,#FFFFFF_100%)] pt-[4.5rem] sm:-mt-20 sm:pt-20">
      <Bubbles count={8} seed={42} />
      <div className="container-x relative py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-muted">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5" />
              {c.href ? (
                <Link href={c.href} className="hover:text-navy">
                  {c.label}
                </Link>
              ) : (
                <span className="text-navy">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-navy sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>}
      </div>
    </section>
  );
}
