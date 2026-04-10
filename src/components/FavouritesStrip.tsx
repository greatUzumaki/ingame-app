"use client";

import type { ApiLeague } from "@/lib/api";
import { apiImg } from "@/lib/api";
import { useFavourites } from "@/context/FavouritesContext";
import LeagueCard from "@/components/LeagueCard";

interface FavouritesStripProps {
  leagues: ApiLeague[];
}

export default function FavouritesStrip({ leagues }: FavouritesStripProps) {
  const { favourites } = useFavourites();

  const favLeagues = leagues.filter((l) => favourites.includes(l.site_id));

  if (favLeagues.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#ff4d4f]">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        Избранное
      </h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
        {favLeagues.map((league) => (
          <div key={league.id} className="w-44 shrink-0">
            <LeagueCard
              slug={league.site_id}
              name={league.name}
              coverImage={apiImg(league.image)}
              logoImage={apiImg(league.image)}
              city={league.city_name}
              showFavBtn
            />
          </div>
        ))}
      </div>
    </div>
  );
}
