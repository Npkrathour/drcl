import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { heading: "Information we collect", body: "Details you provide when placing an order, subscribing to updates or contacting us — such as your name, email, phone number and delivery address." },
        { heading: "How we use it", body: "To process and deliver orders, respond to enquiries and, if you opt in, send product updates and offers." },
        { heading: "Cookies and local storage", body: "This site stores your shopping cart in your browser's local storage so it is kept between visits." },
        { heading: "Your choices", body: "You can unsubscribe from emails at any time and ask us to update or delete your information." },
        { heading: "Contact", body: "Questions about this policy can be sent through our Contact page." },
      ]}
    />
  );
}
