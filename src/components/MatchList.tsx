import { Match } from "@/data/tournaments";

interface MatchListProps {
  matches: Match[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}

export default function MatchList({ matches }: MatchListProps) {
  const sorted = [...matches].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-2">
      {sorted.map((match) => (
        <div
          key={match.id}
          className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)]"
        >
          {/* Date */}
          <div className="shrink-0 w-12 text-center">
            <span className="text-xs font-medium text-[var(--color-text-faint)]">{formatDate(match.date)}</span>
          </div>

          {/* Teams + score */}
          <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
            {/* Home */}
            <span className="text-sm font-medium text-[var(--color-text-primary)] text-right flex-1 truncate">
              {match.homeTeam}
            </span>

            {/* Score / vs */}
            <div className="shrink-0 px-3 py-1 rounded-lg bg-[var(--color-surface-elevated)] text-center min-w-[64px]">
              {match.status === "played" ? (
                <span className="text-sm font-bold text-[var(--color-text-primary)]">
                  {match.homeScore} : {match.awayScore}
                </span>
              ) : (
                <span className="text-xs font-medium text-[var(--color-text-faint)]">vs</span>
              )}
            </div>

            {/* Away */}
            <span className="text-sm font-medium text-[var(--color-text-primary)] flex-1 truncate">
              {match.awayTeam}
            </span>
          </div>

          {/* Status badge */}
          <div className="shrink-0">
            {match.status === "played" ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[var(--color-text-faint)] border border-[var(--color-border)]">
                Завершён
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)] border border-[var(--color-brand-accent)]/20">
                Предстоит
              </span>
            )}
          </div>
        </div>
      ))}

      {matches.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-faint)]">Матчи не найдены</div>
      )}
    </div>
  );
}
