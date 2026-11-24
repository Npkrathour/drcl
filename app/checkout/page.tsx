import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/cart", label: "Cart" }, { label: "Checkout" }]} title="Checkout" />
      <div className="container-x pb-24">
        <CheckoutForm />
      </div>
    </>
  );
}
