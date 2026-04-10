import { fetchTeam, apiImg } from "@/lib/api";
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
  const team = await fetchTeam(Number(id));
  if (!team) return { title: "Команда не найдена" };
  return { title: team.name };
}

export default async function TeamPage({ params }: Props) {
  const { slug, id } = await params;
  const team = await fetchTeam(Number(id));
  if (!team) notFound();

  const image = apiImg(team.image);

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
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[var(--color-surface-elevated)] shrink-0 p-1">
          {image ? (
            <Image src={image} alt={team.name} fill className="object-contain" sizes="80px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-black text-[var(--color-text-faint)]">
              {team.short_name ?? team.name[0]}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-black text-[var(--color-text-primary)]">{team.name}</h1>
          {team.short_name && (
            <span className="text-sm text-[var(--color-text-muted)]">{team.short_name}</span>
          )}
        </div>
      </div>

      {/* Info */}
      {team.basic_information && (
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{team.basic_information}</p>
      )}

      {/* Top scorers */}
      {team.bestPlayers?.length > 0 && (
        <div className="space-y-4">
          {team.bestPlayers.map((cat) => (
            <div key={cat.event_id} className="space-y-2">
              <h2 className="text-base font-bold text-[var(--color-text-primary)]">{cat.name}</h2>
              <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] divide-y divide-[var(--color-border-light)]">
                {cat.players.slice(0, 5).map((p) => (
                  <Link
                    key={p.player_id}
                    href={`/leagues/${slug}/players/${p.player_id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-surface-elevated)] transition-colors"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[var(--color-surface-elevated)] shrink-0">
                      {p.image ? (
                        <Image src={apiImg(p.image)} alt="" fill className="object-cover" sizes="32px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[var(--color-text-faint)]">
                          {p.name[0]}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {p.name} {p.family}
                      </span>
                      <span className="text-xs text-[var(--color-text-faint)] ml-1">({p.position})</span>
                    </div>
                    <span className="text-sm font-black text-[var(--color-brand-accent)]">{p.amount}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* League history */}
      {team.leagues?.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-base font-bold text-[var(--color-text-primary)]">Участие в лигах</h2>
          <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] divide-y divide-[var(--color-border-light)]">
            {team.leagues.slice(0, 10).map((l) => (
              <div key={`${l.league_id}-${l.season_id}`} className="flex items-center gap-3 px-4 py-3">
                {l.league_image && (
                  <div className="relative w-7 h-7 rounded overflow-hidden bg-[var(--color-surface-elevated)] shrink-0">
                    <Image src={apiImg(l.league_image)} alt="" fill className="object-contain" sizes="28px" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight line-clamp-1">
                    {l.league_name}
                  </p>
                  <p className="text-xs text-[var(--color-text-faint)]">{l.season}</p>
                </div>
                {l.place && (
                  <span className="text-sm font-black text-[var(--color-brand-accent)]">{l.place} место</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
