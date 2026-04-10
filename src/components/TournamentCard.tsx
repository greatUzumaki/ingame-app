import Link from "next/link";
import { Tournament } from "@/data/tournaments";

interface TournamentCardProps {
  tournament: Tournament;
}

const statusLabel: Record<Tournament["status"], { text: string; classes: string }> = {
  active: { text: "Активный", classes: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" },
  finished: { text: "Завершён", classes: "bg-white/5 text-[var(--color-text-faint)] border border-[var(--color-border)]" },
  upcoming: { text: "Скоро", classes: "bg-[var(--color-brand-accent)]/15 text-[var(--color-brand-accent)] border border-[var(--color-brand-accent)]/30" },
};

export default function TournamentCard({ tournament }: TournamentCardProps) {
  const status = statusLabel[tournament.status];

  return (
    <Link
      href={`/leagues/${tournament.leagueSlug}/tournaments/${tournament.id}`}
      className="group flex items-center justify-between p-5 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] hover:border-[var(--color-brand-accent)]/30 transition-all hover:shadow-lg hover:shadow-black/20"
    >
      <div>
        <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-accent)] transition-colors">
          {tournament.name}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{tournament.season}</p>
        <p className="text-xs text-[var(--color-text-faint)] mt-1">
          {tournament.standings.length} команд · {tournament.matches.length} матчей
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${status.classes}`}>
          {status.text}
        </span>
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[var(--color-text-faint)] group-hover:fill-[var(--color-brand-accent)] transition-colors">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      </div>
    </Link>
  );
}
