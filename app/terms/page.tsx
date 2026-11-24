import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      sections={[
        { heading: "Use of this website", body: "By using this website you agree to these terms. Product information is provided for general guidance; always read the product label before use." },
        { heading: "Orders and pricing", body: "All prices are in Indian Rupees (₹). We may update prices and availability at any time. An order is confirmed only after we send a confirmation." },
        { heading: "Shipping", body: "Delivery timelines and charges are shown at checkout." },
        { heading: "Returns", body: "Return and refund conditions will be published here." },
        { heading: "Product safety", body: "Use products only as directed on the label. Keep out of reach of children. Do not mix cleaning products." },
      ]}
    />
  );
}
