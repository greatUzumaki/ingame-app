export interface Standing {
  position: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export type MatchStatus = "played" | "scheduled";

export interface Match {
  id: string;
  date: string; // ISO date string
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
}

export type TournamentStatus = "active" | "finished" | "upcoming";

export interface Tournament {
  id: string;
  leagueSlug: string;
  name: string;
  season: string;
  status: TournamentStatus;
  standings: Standing[];
  matches: Match[];
}

export const tournaments: Tournament[] = [
  // Moscow Premier League
  {
    id: "mpl-spring-2026",
    leagueSlug: "moscow-premier-league",
    name: "Весенний Чемпионат",
    season: "Весна 2026",
    status: "active",
    standings: [
      { position: 1, teamName: "Локомотив-Любители", played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 28, goalsAgainst: 9, points: 25 },
      { position: 2, teamName: "Динамо Любительское", played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 22, goalsAgainst: 10, points: 23 },
      { position: 3, teamName: "Спартак Дворовый", played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 20, goalsAgainst: 14, points: 20 },
      { position: 4, teamName: "ЦСКА Любители", played: 10, won: 5, drawn: 1, lost: 4, goalsFor: 17, goalsAgainst: 15, points: 16 },
      { position: 5, teamName: "Торпедо Москва-3", played: 10, won: 4, drawn: 2, lost: 4, goalsFor: 16, goalsAgainst: 18, points: 14 },
      { position: 6, teamName: "Металлург ЗИЛ", played: 10, won: 3, drawn: 3, lost: 4, goalsFor: 14, goalsAgainst: 17, points: 12 },
      { position: 7, teamName: "Буревестник", played: 10, won: 2, drawn: 2, lost: 6, goalsFor: 10, goalsAgainst: 22, points: 8 },
      { position: 8, teamName: "Стрела FC", played: 10, won: 1, drawn: 1, lost: 8, goalsFor: 7, goalsAgainst: 29, points: 4 },
    ],
    matches: [
      { id: "m1", date: "2026-04-05", homeTeam: "Локомотив-Любители", awayTeam: "Динамо Любительское", homeScore: 3, awayScore: 1, status: "played" },
      { id: "m2", date: "2026-04-05", homeTeam: "Спартак Дворовый", awayTeam: "ЦСКА Любители", homeScore: 2, awayScore: 2, status: "played" },
      { id: "m3", date: "2026-04-12", homeTeam: "Динамо Любительское", awayTeam: "Спартак Дворовый", homeScore: 1, awayScore: 0, status: "played" },
      { id: "m4", date: "2026-04-19", homeTeam: "Локомотив-Любители", awayTeam: "ЦСКА Любители", homeScore: undefined, awayScore: undefined, status: "scheduled" },
      { id: "m5", date: "2026-04-19", homeTeam: "Торпедо Москва-3", awayTeam: "Буревестник", homeScore: undefined, awayScore: undefined, status: "scheduled" },
      { id: "m6", date: "2026-04-26", homeTeam: "Металлург ЗИЛ", awayTeam: "Стрела FC", homeScore: undefined, awayScore: undefined, status: "scheduled" },
    ],
  },
  {
    id: "mpl-autumn-2025",
    leagueSlug: "moscow-premier-league",
    name: "Осенний Чемпионат",
    season: "Осень 2025",
    status: "finished",
    standings: [
      { position: 1, teamName: "Динамо Любительское", played: 14, won: 11, drawn: 2, lost: 1, goalsFor: 38, goalsAgainst: 12, points: 35 },
      { position: 2, teamName: "Локомотив-Любители", played: 14, won: 10, drawn: 1, lost: 3, goalsFor: 30, goalsAgainst: 15, points: 31 },
      { position: 3, teamName: "Спартак Дворовый", played: 14, won: 7, drawn: 3, lost: 4, goalsFor: 24, goalsAgainst: 19, points: 24 },
    ],
    matches: [
      { id: "am1", date: "2025-09-06", homeTeam: "Динамо Любительское", awayTeam: "Локомотив-Любители", homeScore: 2, awayScore: 1, status: "played" },
      { id: "am2", date: "2025-09-13", homeTeam: "Спартак Дворовый", awayTeam: "Динамо Любительское", homeScore: 1, awayScore: 3, status: "played" },
    ],
  },

  // St. Petersburg League
  {
    id: "spb-spring-2026",
    leagueSlug: "spb-football-league",
    name: "Весенний Кубок СПб",
    season: "Весна 2026",
    status: "active",
    standings: [
      { position: 1, teamName: "Невский Берег", played: 8, won: 7, drawn: 0, lost: 1, goalsFor: 25, goalsAgainst: 7, points: 21 },
      { position: 2, teamName: "Зенит Любители", played: 8, won: 6, drawn: 1, lost: 1, goalsFor: 20, goalsAgainst: 8, points: 19 },
      { position: 3, teamName: "Петроградская", played: 8, won: 4, drawn: 2, lost: 2, goalsFor: 15, goalsAgainst: 12, points: 14 },
      { position: 4, teamName: "Васильевский FC", played: 8, won: 3, drawn: 1, lost: 4, goalsFor: 12, goalsAgainst: 16, points: 10 },
      { position: 5, teamName: "Балтийцы", played: 8, won: 0, drawn: 0, lost: 8, goalsFor: 3, goalsAgainst: 32, points: 0 },
    ],
    matches: [
      { id: "sp1", date: "2026-04-06", homeTeam: "Невский Берег", awayTeam: "Зенит Любители", homeScore: 2, awayScore: 0, status: "played" },
      { id: "sp2", date: "2026-04-13", homeTeam: "Зенит Любители", awayTeam: "Петроградская", homeScore: 3, awayScore: 1, status: "played" },
      { id: "sp3", date: "2026-04-20", homeTeam: "Невский Берег", awayTeam: "Петроградская", homeScore: undefined, awayScore: undefined, status: "scheduled" },
      { id: "sp4", date: "2026-04-27", homeTeam: "Васильевский FC", awayTeam: "Балтийцы", homeScore: undefined, awayScore: undefined, status: "scheduled" },
    ],
  },

  // Kazan Futsal
  {
    id: "kazan-spring-2026",
    leagueSlug: "kazan-futsal",
    name: "Чемпионат по Мини-Футболу",
    season: "Весна 2026",
    status: "active",
    standings: [
      { position: 1, teamName: "Татарстан FC", played: 6, won: 5, drawn: 1, lost: 0, goalsFor: 22, goalsAgainst: 8, points: 16 },
      { position: 2, teamName: "Кремль FC", played: 6, won: 4, drawn: 1, lost: 1, goalsFor: 18, goalsAgainst: 10, points: 13 },
      { position: 3, teamName: "Волга United", played: 6, won: 2, drawn: 2, lost: 2, goalsFor: 12, goalsAgainst: 14, points: 8 },
      { position: 4, teamName: "Казанские Тигры", played: 6, won: 0, drawn: 0, lost: 6, goalsFor: 4, goalsAgainst: 24, points: 0 },
    ],
    matches: [
      { id: "kz1", date: "2026-04-04", homeTeam: "Татарстан FC", awayTeam: "Кремль FC", homeScore: 4, awayScore: 2, status: "played" },
      { id: "kz2", date: "2026-04-11", homeTeam: "Волга United", awayTeam: "Казанские Тигры", homeScore: 5, awayScore: 1, status: "played" },
      { id: "kz3", date: "2026-04-18", homeTeam: "Татарстан FC", awayTeam: "Волга United", homeScore: undefined, awayScore: undefined, status: "scheduled" },
    ],
  },

  // Ekaterinburg
  {
    id: "ekb-spring-2026",
    leagueSlug: "ekb-city-league",
    name: "Городской Чемпионат",
    season: "Весна 2026",
    status: "active",
    standings: [
      { position: 1, teamName: "Уральские Медведи", played: 7, won: 6, drawn: 0, lost: 1, goalsFor: 20, goalsAgainst: 6, points: 18 },
      { position: 2, teamName: "Горный Орёл FC", played: 7, won: 5, drawn: 1, lost: 1, goalsFor: 17, goalsAgainst: 8, points: 16 },
      { position: 3, teamName: "Исеть Спорт", played: 7, won: 3, drawn: 2, lost: 2, goalsFor: 13, goalsAgainst: 11, points: 11 },
      { position: 4, teamName: "Старый Арбат", played: 7, won: 1, drawn: 1, lost: 5, goalsFor: 6, goalsAgainst: 18, points: 4 },
      { position: 5, teamName: "Синяя Птица", played: 7, won: 0, drawn: 2, lost: 5, goalsFor: 4, goalsAgainst: 17, points: 2 },
    ],
    matches: [
      { id: "ek1", date: "2026-04-05", homeTeam: "Уральские Медведи", awayTeam: "Горный Орёл FC", homeScore: 2, awayScore: 1, status: "played" },
      { id: "ek2", date: "2026-04-12", homeTeam: "Исеть Спорт", awayTeam: "Старый Арбат", homeScore: 3, awayScore: 0, status: "played" },
      { id: "ek3", date: "2026-04-19", homeTeam: "Горный Орёл FC", awayTeam: "Исеть Спорт", homeScore: undefined, awayScore: undefined, status: "scheduled" },
    ],
  },
];

export function getTournamentsByLeague(leagueSlug: string): Tournament[] {
  return tournaments.filter((t) => t.leagueSlug === leagueSlug);
}

export function getTournamentById(id: string): Tournament | undefined {
  return tournaments.find((t) => t.id === id);
}
