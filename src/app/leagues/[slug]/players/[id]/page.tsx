import { fetchPlayer, apiImg } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const player = await fetchPlayer(Number(id));
  if (!player) return { title: "Игрок не найден" };
  return { title: `${player.name} ${player.family}` };
}

function formatBirthday(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default async function PlayerPage({ params }: Props) {
  const { slug, id } = await params;
  const player = await fetchPlayer(Number(id));
  if (!player) notFound();

  const image = apiImg(player.image);
  const fullName = [player.name, player.family].filter(Boolean).join(" ");

  const attrs: { label: string; value: string }[] = [];
  if (player.position) attrs.push({ label: "Позиция", value: player.position });
  if (player.birthday) attrs.push({ label: "Дата рождения", value: formatBirthday(player.birthday) });
  if (player.age) attrs.push({ label: "Возраст", value: `${player.age} лет` });
  if (player.nationality) attrs.push({ label: "Национальность", value: player.nationality });
  if (player.height) attrs.push({ label: "Рост", value: `${player.height} см` });
  if (player.weight) attrs.push({ label: "Вес", value: `${player.weight} кг` });
  if (player.work_foot) attrs.push({ label: "Рабочая нога", value: player.work_foot });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Back */}
      <Link
        href={`/leagues/${slug}`}
        className="text-sm text-[var(--color-text-faint)] hover:text-[var(--color-brand-accent)] transition-colors"
      >
        ← Назад к лиге
      </Link>

      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-[var(--color-surface-elevated)] shrink-0">
          {image ? (
            <Image src={image} alt={fullName} fill className="object-cover" sizes="80px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-black text-[var(--color-text-faint)]">
              {player.name?.[0] ?? "?"}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-black text-[var(--color-text-primary)]">{fullName}</h1>
          {player.short_position && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)]">
              {player.short_position}
            </span>
          )}
        </div>
      </div>

      {/* Attributes */}
      {attrs.length > 0 && (
        <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] divide-y divide-[var(--color-border-light)]">
          {attrs.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Teams */}
      {player.teams.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Команды</h2>
          <div className="space-y-2">
            {player.teams.map((t) => (
              <Link
                key={t.team_id}
                href={`/leagues/${slug}/teams/${t.team_id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] hover:border-[var(--color-brand-accent)]/30 transition-colors"
              >
                {t.image && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[var(--color-surface-elevated)] shrink-0">
                    <Image src={apiImg(t.image)} alt="" fill className="object-cover" sizes="32px" />
                  </div>
                )}
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">{t.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
