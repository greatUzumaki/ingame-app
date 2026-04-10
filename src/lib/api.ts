export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "https://37.46.130.153:3001";

/** Prepend API base URL to a relative image path from the API */
export function apiImg(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiLeague {
  id: number;
  name: string;
  image: string;
  city_name: string;
  site_id: string;
}

export interface ApiMatch {
  id: number;
  home_team_id: number;
  guest_team_id: number;
  home_team_scores: number | null;
  guest_team_scores: number | null;
  league_id: number;
  date: string;
  time: string;
  status: number; // 2 = played, 1 = scheduled
  home_team_name: string;
  guest_team_name: string;
  home_team_short_name: string;
  guest_team_short_name: string;
  home_team_image: string;
  guest_team_image: string;
  short_stage_name: string | null;
  stadium_name: string | null;
  league_name: string;
  resheduled: string | null;
}

export interface ApiTableRow {
  team_id: number;
  name: string;
  short_name: string;
  image: string;
  group_name: string | null;
  matches_amount: number;
  wins_amount: number;
  loses_amount: number;
  draws_amount: number;
  goals_for: number;
  goals_against: number;
  goals_diff: number;
  points: number;
  priority: number;
}

export interface ApiSubLeague {
  id: number;
  league_name: string;
  image: string;
  active_season: number;
  champ_name: string;
  priority?: number;
  l_priority?: number;
  active?: number;
}

export interface ApiLeagueDetail {
  id: number;
  name: string;
  image: string;
  site_id: string | null;
  info: string | null;
  leagues: ApiSubLeague[];
  active_leagues: ApiSubLeague[];
  league_table: ApiTableRow[];
  league_table_active: { league_id: number; type: number } | null;
  matches: ApiMatch[];
  partners: ApiPartner[];
  socials: unknown[];
  seasons: { id: number; name: string }[];
}

export interface ApiNewsArticle {
  id: number;
  image: string;
  title: string;
  text: string;
  created_at: string;
  likes_amount: number | null;
  comment_amount: number | null;
  client_owner: number;
  league_id: number;
  season_id: number;
  client_name: string;
  client_image: string;
  league_name: string;
  league_image: string;
}

export interface ApiPartner {
  id: number;
  name: string;
  description: string | null;
  image: string;
  href: string | null;
}

// ─── Fetch helpers ─────────────────────────────────────────────────────────────

const REVALIDATE = 60; // seconds

/** Fetch the full list of leagues (championships), filtered to those with a site_id */
export async function fetchLeagues(): Promise<ApiLeague[]> {
  try {
    const res = await fetch(`${API_BASE}/clients/`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return [];
    const data: ApiLeague[] = await res.json();
    return data.filter((l) => l.site_id != null);
  } catch {
    return [];
  }
}

/** Fetch full detail for one league by numeric id */
export async function fetchLeague(id: number): Promise<ApiLeagueDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/clients/${id}`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/** Fetch all news articles for a championship (client) id */
export async function fetchNews(clientId: number): Promise<ApiNewsArticle[]> {
  try {
    const res = await fetch(`${API_BASE}/league_news/${clientId}/getAllNews`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/** Fetch partners for a championship (client) id */
export async function fetchPartners(clientId: number): Promise<ApiPartner[]> {
  try {
    const res = await fetch(`${API_BASE}/championships/${clientId}/partners`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/** Resolve a slug (site_id) to the numeric league id. Returns null if not found. */
export async function resolveLeagueId(slug: string): Promise<{ id: number; league: ApiLeague } | null> {
  const leagues = await fetchLeagues();
  const found = leagues.find((l) => l.site_id === slug);
  return found ? { id: found.id, league: found } : null;
}

/** Strip internal link markup from news text: {///href///}label{//href//}key{///href///} */
export function stripNewsMarkup(text: string): string {
  return text.replace(/\{\/\/\/href\/\/\/\}.*?\{\/\/href\/\/\}.*?\{\/\/\/href\/\/\/\}/g, "").trim();
}
