import { getTournamentById } from "@/data/tournaments";
import StandingsTable from "@/components/StandingsTable";
import MatchList from "@/components/MatchList";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string; tournamentId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tournamentId } = await params;
  const t = getTournamentById(tournamentId);
  return { title: t ? t.name : "Турнир не найден" };
}

const statusLabel: Record<string, string> = {
  active: "Активный",
  finished: "Завершён",
  upcoming: "Скоро",
};

export default async function TournamentDetailPage({ params }: Props) {
  const { slug, tournamentId } = await params;
  const tournament = getTournamentById(tournamentId);

  if (!tournament || tournament.leagueSlug !== slug) notFound();

  const played = tournament.matches.filter((m) => m.status === "played");
  const scheduled = tournament.matches.filter((m) => m.status === "scheduled");

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-faint)]">
        <Link href={`/leagues/${slug}/tournaments`} className="hover:text-[var(--color-brand-accent)] transition-colors">
          ← Все турниры
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)]">{tournament.name}</h2>
          <p className="text-[var(--color-text-muted)] mt-1">{tournament.season}</p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold shrink-0 ${
          tournament.status === "active"
            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
            : tournament.status === "upcoming"
            ? "bg-[var(--color-brand-accent)]/15 text-[var(--color-brand-accent)] border border-[var(--color-brand-accent)]/30"
            : "bg-white/5 text-[var(--color-text-faint)] border border-[var(--color-border)]"
        }`}>
          {statusLabel[tournament.status]}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: tournament.standings.length, label: "Команд" },
          { value: played.length, label: "Сыграно" },
          { value: scheduled.length, label: "Предстоит" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] p-4 text-center">
            <div className="text-2xl font-black text-[var(--color-brand-accent)]">{s.value}</div>
            <div className="text-xs text-[var(--color-text-faint)] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Standings */}
      {tournament.standings.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Турнирная таблица</h3>
          <StandingsTable standings={tournament.standings} />
        </section>
      )}

      {/* Matches */}
      {tournament.matches.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Матчи</h3>
          <MatchList matches={tournament.matches} />
        </section>
      )}
    </div>
  );
}
