import { resolveLeagueId, fetchPartners } from "@/lib/api";
import PartnerCard from "@/components/PartnerCard";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PartnersPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveLeagueId(slug);
  if (!resolved) notFound();

  const partners = await fetchPartners(resolved.id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[var(--color-text-primary)]">Партнеры</h2>
        {partners.length > 0 && (
          <p className="text-[var(--color-text-muted)] mt-1">{partners.length} партнёров лиги</p>
        )}
      </div>

      {partners.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[var(--color-text-faint)]">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current mx-auto mb-4 opacity-40">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          <p className="text-lg font-semibold">Партнеры не указаны</p>
        </div>
      )}
    </div>
  );
}
