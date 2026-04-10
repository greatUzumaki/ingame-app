import { fetchLeagues } from "@/lib/api";
import LeaguesGrid from "@/components/LeaguesGrid";
import FavouritesStrip from "@/components/FavouritesStrip";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Все лиги | BARDIUZHENKO",
};

export default async function LeaguesPage() {
  const leagues = await fetchLeagues();
  const cityCount = new Set(leagues.map((l) => l.city_name).filter(Boolean)).size;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)]">Все лиги</h1>
        <p className="text-[var(--color-text-muted)] mt-2">
          {leagues.length} лиг в {cityCount} городах России
        </p>
      </div>

      <FavouritesStrip leagues={leagues} />
      <LeaguesGrid leagues={leagues} showCityFilter showFavBtn />
    </div>
  );
}
