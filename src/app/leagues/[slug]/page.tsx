import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { resolveLeagueId, fetchLeague, fetchNews, apiImg, type ApiMatch, type ApiTableRow } from "@/lib/api";
import NewsCard from "@/components/NewsCard";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}

function groupBy<T>(arr: T[], key: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of arr) {
    const k = key(item);
    const group = map.get(k) ?? [];
    group.push(item);
    map.set(k, group);
  }
  return map;
}

// ── Match row ──────────────────────────────────────────────────────────────────

function MatchRow({ m, played }: { m: ApiMatch; played: boolean }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 border-b border-[var(--color-border-light)] last:border-0">
      {/* Home */}
      <div className="flex items-center gap-2 justify-end">
        <span className="text-sm font-medium text-[var(--color-text-primary)] text-right leading-tight line-clamp-2">
          {m.home_team_name}
        </span>
        {m.home_team_image && (
          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[var(--color-surface-elevated)] shrink-0">
            <Image src={apiImg(m.home_team_image)} alt="" fill className="object-cover" sizes="28px" />
          </div>
        )}
      </div>

      {/* Score / VS */}
      <div className="text-center min-w-[64px]">
        {played ? (
          <span className="text-base font-black text-[var(--color-text-primary)]">
            {m.home_team_scores ?? "–"}&nbsp;:&nbsp;{m.guest_team_scores ?? "–"}
          </span>
        ) : (
          <span className="text-xs font-bold text-[var(--color-brand-accent)]">VS</span>
        )}
        <div className="text-[10px] text-[var(--color-text-faint)] mt-0.5">{formatDate(m.date)}</div>
      </div>

      {/* Guest */}
      <div className="flex items-center gap-2">
        {m.guest_team_image && (
          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[var(--color-surface-elevated)] shrink-0">
            <Image src={apiImg(m.guest_team_image)} alt="" fill className="object-cover" sizes="28px" />
          </div>
        )}
        <span className="text-sm font-medium text-[var(--color-text-primary)] leading-tight line-clamp-2">
          {m.guest_team_name}
        </span>
      </div>
    </div>
  );
}

// ── Standings table ────────────────────────────────────────────────────────────

function StandingsSection({ rows }: { rows: ApiTableRow[] }) {
  const sorted = [...rows].sort((a, b) => b.points - a.points || b.goals_diff - a.goals_diff);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs min-w-[480px]">
        <thead>
          <tr className="text-[var(--color-text-faint)] border-b border-[var(--color-border-light)]">
            <th className="text-left py-2 px-3 w-6">#</th>
            <th className="text-left py-2 px-3">Команда</th>
            <th className="py-2 px-2 text-center">Г</th>
            <th className="py-2 px-2 text-center">В</th>
            <th className="py-2 px-2 text-center">Н</th>
            <th className="py-2 px-2 text-center">П</th>
            <th className="py-2 px-2 text-center">РГ</th>
            <th className="py-2 px-2 text-center font-bold text-[var(--color-text-muted)]">О</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.team_id}
              className={`border-b border-[var(--color-border-light)] last:border-0 ${i === 0 ? "bg-[var(--color-brand-accent)]/5" : ""}`}
            >
              <td className="py-2.5 px-3 text-[var(--color-text-faint)] font-semibold">{i + 1}</td>
              <td className="py-2.5 px-3">
                <div className="flex items-center gap-2">
                  {row.image && (
                    <div className="relative w-5 h-5 rounded-full overflow-hidden bg-[var(--color-surface-elevated)] shrink-0">
                      <Image src={apiImg(row.image)} alt="" fill className="object-cover" sizes="20px" />
                    </div>
                  )}
                  <span className="text-[var(--color-text-primary)] font-medium truncate max-w-[160px] sm:max-w-none">
                    {row.short_name || row.name}
                  </span>
                </div>
              </td>
              <td className="py-2.5 px-2 text-center text-[var(--color-text-muted)]">{row.matches_amount}</td>
              <td className="py-2.5 px-2 text-center text-emerald-400">{row.wins_amount}</td>
              <td className="py-2.5 px-2 text-center text-[var(--color-text-faint)]">{row.draws_amount}</td>
              <td className="py-2.5 px-2 text-center text-red-400">{row.loses_amount}</td>
              <td className="py-2.5 px-2 text-center text-[var(--color-text-muted)]">
                {row.goals_for}:{row.goals_against}
              </td>
              <td className="py-2.5 px-2 text-center font-black text-[var(--color-text-primary)]">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function LeagueHomePage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveLeagueId(slug);
  if (!resolved) notFound();

  const { id } = resolved;
  const [detail, allNews] = await Promise.all([fetchLeague(id), fetchNews(id)]);
  if (!detail) notFound();

  const latestNews = allNews.slice(0, 3);

  // Matches
  const playedMatches = detail.matches
    .filter((m) => m.status === 2)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20);

  const upcomingMatches = detail.matches
    .filter((m) => m.status === 1)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10);

  // Group played matches by short_stage_name
  const playedByStage = groupBy(playedMatches, (m) => m.short_stage_name ?? "Матчи");
  const upcomingByStage = groupBy(upcomingMatches, (m) => m.short_stage_name ?? "Матчи");

  // Group standings by group_name
  const standingsByGroup = groupBy(detail.league_table, (r) => r.group_name ?? "");

  const hasMatches = detail.matches.length > 0;
  const hasTable = detail.league_table.length > 0;

  return (
    <div className="space-y-8">

      {/* ── Stats bar ── */}
      <div className="flex flex-wrap gap-3">
        {detail.active_leagues.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-sm text-[var(--color-text-muted)]">
              Активных соревнований: <span className="font-bold text-[var(--color-text-primary)]">{detail.active_leagues.length}</span>
            </span>
          </div>
        )}
        {detail.league_table.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)]">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[var(--color-text-faint)] shrink-0">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <span className="text-sm text-[var(--color-text-muted)]">
              Команд: <span className="font-bold text-[var(--color-text-primary)]">{detail.league_table.length}</span>
            </span>
          </div>
        )}
        {detail.matches.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)]">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[var(--color-text-faint)] shrink-0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            <span className="text-sm text-[var(--color-text-muted)]">
              Матчей: <span className="font-bold text-[var(--color-text-primary)]">{detail.matches.length}</span>
            </span>
          </div>
        )}
      </div>

      {/* ── Upcoming matches ── */}
      {upcomingMatches.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-accent)] animate-pulse" />
            Предстоящие матчи
          </h2>
          <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] overflow-hidden">
            {Array.from(upcomingByStage.entries()).map(([stage, matches]) => (
              <div key={stage}>
                {stage && (
                  <div className="px-4 py-2 bg-[var(--color-surface-elevated)] border-b border-[var(--color-border-light)]">
                    <span className="text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-wider">{stage}</span>
                  </div>
                )}
                {matches.map((m) => <MatchRow key={m.id} m={m} played={false} />)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Recent (played) matches ── */}
      {playedMatches.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-3">Последние матчи</h2>
          <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] overflow-hidden">
            {Array.from(playedByStage.entries()).map(([stage, matches]) => (
              <div key={stage}>
                {stage && (
                  <div className="px-4 py-2 bg-[var(--color-surface-elevated)] border-b border-[var(--color-border-light)]">
                    <span className="text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-wider">{stage}</span>
                  </div>
                )}
                {matches.map((m) => <MatchRow key={m.id} m={m} played />)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Standings ── */}
      {hasTable && (
        <section>
          <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-3">Турнирные таблицы</h2>
          <div className="space-y-4">
            {Array.from(standingsByGroup.entries()).map(([group, rows]) => (
              <div key={group} className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] overflow-hidden">
                {group && (
                  <div className="px-4 py-2.5 bg-[var(--color-surface-elevated)] border-b border-[var(--color-border-light)]">
                    <span className="text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-wider">{group}</span>
                  </div>
                )}
                <StandingsSection rows={rows} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Latest news ── */}
      {latestNews.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">Новости</h2>
            <Link href={`/leagues/${slug}/news`} className="text-xs text-[var(--color-brand-accent)] hover:underline">
              Все новости →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestNews.map((article) => (
              <NewsCard key={article.id} article={article} leagueSlug={slug} />
            ))}
          </div>
        </section>
      )}

      {/* ── Empty state ── */}
      {!hasMatches && !hasTable && (
        <div className="text-center py-16 text-[var(--color-text-faint)]">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current mx-auto mb-3 opacity-30">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          <p className="font-semibold">Данные ещё не добавлены</p>
        </div>
      )}
    </div>
  );
}
