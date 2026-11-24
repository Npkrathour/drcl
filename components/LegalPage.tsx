import { Info } from "lucide-react";
import PageHeader from "./PageHeader";

export default function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHeader crumbs={[{ label: title }]} title={title} />
      <div className="container-x max-w-3xl pb-24">
        <p className="flex items-start gap-2 rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          Draft placeholder. This page must be reviewed and finalised by DRCL (with legal advice) before the store goes live.
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-semibold text-navy">{s.heading}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
