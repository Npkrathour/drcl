import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <Image src="/images/products/glass-cleaner.svg" alt="" width={120} height={168} className="-rotate-12 opacity-90" />
      <p className="mt-6 font-display text-6xl font-semibold text-navy">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy">This page has been wiped clean</h1>
      <p className="mt-2 text-muted">We couldn&apos;t find what you were looking for.</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/products" variant="outline">
          Shop products
        </ButtonLink>
      </div>
    </div>
  );
}
