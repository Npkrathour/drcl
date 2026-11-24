import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { WhatsAppIcon, whatsappUrl } from "@/components/WhatsApp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact DRCL in Badripur Hadira, Powayan, Shahjahanpur (UP) for cleaning product orders, wholesale and dealership enquiries — call or WhatsApp +91 95698 58304.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Phone, label: "Phone", value: site.contact.phone, href: site.contact.phone && `tel:${site.contact.phone.replace(/\s/g, "")}` },
  { icon: WhatsAppIcon, label: "WhatsApp Business",value: whatsappUrl && site.contact.phone, href: whatsappUrl, external: true },
  { icon: Mail, label: "Email", value: site.contact.email, href: site.contact.email && `mailto:${site.contact.email}` },
  { icon: MapPin, label: "Address", value: site.contact.address, href: "" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        title={
          <>
            We&apos;d love to <span className="text-gradient">hear from you</span>
          </>
        }
        description="Questions about a product, an order or bulk supply? Send us a message."
      />
      <div className="container-x grid gap-8 pb-24 lg:grid-cols-[1fr_1.6fr]">
        <div className="space-y-4">
          {details.map((d) => (
            <div key={d.label} className="flex items-start gap-4 rounded-[1.5rem] border border-line/70 bg-white p-5 shadow-soft">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-fresh-100 text-fresh-600">
                <d.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">{d.label}</p>
                {d.value ? (
                  d.href ? (
                    <a
                      href={d.href}
                      {...("external" in d && d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-muted hover:text-navy"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="text-muted">{d.value}</p>
                  )
                ) : (
                  <p className="text-sm text-muted italic">To be announced</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
    </>
  );
}
