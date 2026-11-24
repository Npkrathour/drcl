"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingCart, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import SearchOverlay from "./SearchOverlay";
import { ButtonLink } from "./ui/Button";
import { navLinks } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopLinks() {
  const pathname = usePathname();
  return <LinkList pathname={pathname} />;
}

function LinkList({ pathname }: { pathname: string | null }) {
  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {navLinks.map((link) => {
        const active = pathname ? isActive(pathname, link.href) : false;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative block px-3.5 py-2 text-[0.92rem] font-medium transition-colors",
                active ? "text-navy" : "text-charcoal/70 hover:text-navy",
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute inset-x-3.5 bottom-0 h-0.5 origin-left rounded-full bg-fresh transition-transform duration-300",
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function CartButton() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
      className="relative grid h-10 w-10 place-items-center rounded-full text-navy transition-colors hover:bg-mint"
    >
      <ShoppingCart className="h-5 w-5" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-fresh px-1 text-[0.68rem] font-bold text-white ring-2 ring-white"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-line/80 bg-white/85 shadow-[0_8px_30px_-20px_rgb(16_42_67/0.35)] backdrop-blur-xl" : "bg-white/0",
        )}
      >
        <nav className="container-x flex h-[4.5rem] items-center justify-between gap-4 sm:h-20">
          <Logo />

          <Suspense fallback={<LinkList pathname={null} />}>
            <DesktopLinks />
          </Suspense>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="grid h-10 w-10 place-items-center rounded-full text-navy transition-colors hover:bg-mint"
            >
              <Search className="h-5 w-5" />
            </button>
            <CartButton />
            <span className="ml-1 hidden sm:block">
              <ButtonLink href="/products" size="sm">
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full text-navy transition-colors hover:bg-mint lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute top-0 right-0 flex h-full w-[min(86vw,360px)] flex-col bg-white p-6 shadow-2xl"
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-mint"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-10 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-medium text-navy transition-colors hover:bg-mint"
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4 text-fresh" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto space-y-3">
                <ButtonLink href="/products" className="w-full" size="lg" onClick={() => setMenuOpen(false)}>
                  Shop Now
                </ButtonLink>
                <ButtonLink href="/cart" variant="outline" className="w-full" size="lg" onClick={() => setMenuOpen(false)}>
                  View Cart
                </ButtonLink>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
