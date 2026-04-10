import { resolveLeagueId } from "@/lib/api";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ContactsPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveLeagueId(slug);
  if (!resolved) notFound();

  // The API does not expose contact details — show a placeholder
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-[var(--color-text-primary)]">Контакты</h2>
        <p className="text-[var(--color-text-muted)] mt-1">Свяжитесь с организаторами лиги</p>
      </div>

      <div className="text-center py-20 text-[var(--color-text-faint)]">
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current mx-auto mb-4 opacity-40">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <p className="text-lg font-semibold">Контактная информация не указана</p>
      </div>
    </div>
  );
}
