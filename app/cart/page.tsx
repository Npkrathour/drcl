import type { Metadata } from "next";
import CartView from "@/components/CartView";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Your Cart" };

export default function CartPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Cart" }]} title="Shopping cart" />
      <div className="container-x pb-24">
        <CartView />
      </div>
    </>
  );
}
