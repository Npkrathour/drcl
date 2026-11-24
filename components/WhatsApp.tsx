import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const whatsappUrl = site.contact.whatsapp
  ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent("Hi DRCL, I have a question about your products.")}`
  : "";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.3 15.1 0 12 0 5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.6c1.8 1 3.7 1.5 5.7 1.5 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4z" />
    </svg>
  );
}

/** Floating chat button, bottom-right. The cart toast sits above it. */
export function WhatsAppFloat() {
  if (!whatsappUrl) return null;
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DRCL on WhatsApp Business"
      className={cn(
        "group fixed right-4 bottom-4 z-[50] flex items-center gap-2 rounded-full bg-[#25d366] p-3.5 text-white shadow-lift",
        "transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5b] sm:right-6 sm:bottom-6",
      )}
    >
      <span className="relative grid place-items-center">
        <span aria-hidden className="absolute -inset-2 animate-ping rounded-full bg-white/30 [animation-duration:2.4s]" />
        <WhatsAppIcon className="relative h-6 w-6" />
      </span>
      <span className="hidden pr-1 text-sm font-semibold lg:inline">Chat with us</span>
    </a>
  );
}
