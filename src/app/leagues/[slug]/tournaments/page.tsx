import { resolveLeagueId, fetchLeague, apiImg } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}

export default async function TournamentsPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveLeagueId(slug);
  if (!resolved) notFound();

  const detail = await fetchLeague(resolved.id);
  if (!detail) notFound();

  const subLeagues = detail.active_leagues.length > 0 ? detail.active_leagues : detail.leagues;
  const matches = detail.matches ?? [];
  const playedMatches = matches.filter((m) => m.status === 2);
  const upcomingMatches = matches.filter((m) => m.status === 1);

  const isEmpty = subLeagues.length === 0 && matches.length === 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-[var(--color-text-primary)]">Турниры</h2>
      </div>

      {isEmpty ? (
        <div className="text-center py-20 text-[var(--color-text-faint)]">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current mx-auto mb-4 opacity-40">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <p className="text-lg font-semibold">Турниры не найдены</p>
          <p className="text-sm mt-2 text-[var(--color-text-faint)]">Информация о турнирах пока не добавлена</p>
        </div>
      ) : (
        <>
          {/* Sub-leagues */}
          {subLeagues.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-[var(--color-text-faint)] uppercase tracking-wider mb-4">
                Лиги / Дивизионы
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subLeagues.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center gap-3 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] p-4"
                  >
                    {sub.image && (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[var(--color-surface-elevated)]">
                        <Image
                          src={apiImg(sub.image)}
                          alt={sub.league_name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-[var(--color-text-primary)] truncate">
                        {sub.league_name}
                      </p>
                      {sub.champ_name && (
                        <p className="text-xs text-[var(--color-text-faint)] truncate">{sub.champ_name}</p>
                      )}
                    </div>
                    {sub.active === 1 && (
                      <span className="ml-auto shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        Активна
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Upcoming matches */}
          {upcomingMatches.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-[var(--color-brand-accent)] uppercase tracking-wider mb-4">
                Предстоящие матчи
              </h3>
              <div className="space-y-3">
                {upcomingMatches.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] p-4 flex items-center gap-4 flex-wrap"
                  >
                    <Link href={`/leagues/${slug}/teams/${m.home_team_id}`} className="flex items-center gap-3 flex-1 min-w-0 justify-end hover:opacity-75 transition-opacity">
                      {m.home_team_image && (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[var(--color-surface-elevated)] shrink-0">
                          <Image src={apiImg(m.home_team_image)} alt={m.home_team_name} fill className="object-cover" sizes="32px" />
                        </div>
                      )}
                      <span className="font-semibold text-sm text-[var(--color-text-primary)] truncate">{m.home_team_name}</span>
                    </Link>

                    <div className="text-center shrink-0">
                      <div className="text-xs font-bold text-[var(--color-brand-accent)]">VS</div>
                      <div className="text-xs text-[var(--color-text-faint)] mt-0.5">{formatDate(m.date)}</div>
                      {m.time && <div className="text-xs text-[var(--color-text-faint)]">{m.time}</div>}
                    </div>

                    <Link href={`/leagues/${slug}/teams/${m.guest_team_id}`} className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-75 transition-opacity">
                      {m.guest_team_image && (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[var(--color-surface-elevated)] shrink-0">
                          <Image src={apiImg(m.guest_team_image)} alt={m.guest_team_name} fill className="object-cover" sizes="32px" />
                        </div>
                      )}
                      <span className="font-semibold text-sm text-[var(--color-text-primary)] truncate">{m.guest_team_name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Played matches */}
          {playedMatches.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-[var(--color-text-faint)] uppercase tracking-wider mb-4">
                Сыгранные матчи
              </h3>
              <div className="space-y-3">
                {playedMatches.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] p-4 flex items-center gap-4 flex-wrap"
                  >
                    <Link href={`/leagues/${slug}/teams/${m.home_team_id}`} className="flex items-center gap-3 flex-1 min-w-0 justify-end hover:opacity-75 transition-opacity">
                      {m.home_team_image && (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[var(--color-surface-elevated)] shrink-0">
                          <Image src={apiImg(m.home_team_image)} alt={m.home_team_name} fill className="object-cover" sizes="32px" />
                        </div>
                      )}
                      <span className="font-semibold text-sm text-[var(--color-text-primary)] truncate">{m.home_team_name}</span>
                    </Link>

                    <div className="text-center shrink-0 min-w-[56px]">
                      <div className="text-lg font-black text-[var(--color-text-primary)]">
                        {m.home_team_scores ?? "–"} : {m.guest_team_scores ?? "–"}
                      </div>
                      <div className="text-xs text-[var(--color-text-faint)]">{formatDate(m.date)}</div>
                    </div>

                    <Link href={`/leagues/${slug}/teams/${m.guest_team_id}`} className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-75 transition-opacity">
                      {m.guest_team_image && (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[var(--color-surface-elevated)] shrink-0">
                          <Image src={apiImg(m.guest_team_image)} alt={m.guest_team_name} fill className="object-cover" sizes="32px" />
                        </div>
                      )}
                      <span className="font-semibold text-sm text-[var(--color-text-primary)] truncate">{m.guest_team_name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
