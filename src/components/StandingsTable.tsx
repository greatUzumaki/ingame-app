import { Standing } from "@/data/tournaments";

interface StandingsTableProps {
  standings: Standing[];
}

export default function StandingsTable({ standings }: StandingsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border-light)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--color-surface-elevated)] text-[var(--color-text-faint)] text-xs uppercase tracking-wider">
            <th className="py-3 px-4 text-left w-8">#</th>
            <th className="py-3 px-4 text-left">Команда</th>
            <th className="py-3 px-4 text-center" title="Игры">И</th>
            <th className="py-3 px-4 text-center" title="Победы">В</th>
            <th className="py-3 px-4 text-center" title="Ничьи">Н</th>
            <th className="py-3 px-4 text-center" title="Поражения">П</th>
            <th className="py-3 px-4 text-center" title="Голы забитые">ГЗ</th>
            <th className="py-3 px-4 text-center" title="Голы пропущенные">ГП</th>
            <th className="py-3 px-4 text-center" title="Разница мячей">РМ</th>
            <th className="py-3 px-4 text-center font-bold" title="Очки">О</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row, i) => {
            const goalDiff = row.goalsFor - row.goalsAgainst;
            const isLeader = i === 0;
            return (
              <tr
                key={row.teamName}
                className={`border-t border-[var(--color-border-light)] transition-colors ${
                  isLeader
                    ? "bg-[var(--color-brand-accent)]/5"
                    : "hover:bg-white/3"
                }`}
              >
                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-bold ${
                      isLeader
                        ? "bg-amber-500/20 text-amber-400"
                        : "text-[var(--color-text-faint)]"
                    }`}
                  >
                    {row.position}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium text-[var(--color-text-primary)]">{row.teamName}</td>
                <td className="py-3 px-4 text-center text-[var(--color-text-muted)]">{row.played}</td>
                <td className="py-3 px-4 text-center text-emerald-400">{row.won}</td>
                <td className="py-3 px-4 text-center text-[var(--color-text-muted)]">{row.drawn}</td>
                <td className="py-3 px-4 text-center text-rose-400">{row.lost}</td>
                <td className="py-3 px-4 text-center text-[var(--color-text-muted)]">{row.goalsFor}</td>
                <td className="py-3 px-4 text-center text-[var(--color-text-muted)]">{row.goalsAgainst}</td>
                <td className={`py-3 px-4 text-center font-medium ${goalDiff > 0 ? "text-emerald-400" : goalDiff < 0 ? "text-rose-400" : "text-[var(--color-text-muted)]"}`}>
                  {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`font-bold text-base ${isLeader ? "text-[var(--color-brand-accent)]" : "text-[var(--color-text-primary)]"}`}>
                    {row.points}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
