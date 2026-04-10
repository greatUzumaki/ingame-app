"use client";

import { useState, useMemo, useRef } from "react";
import type { ApiLeague } from "@/lib/api";
import { apiImg } from "@/lib/api";
import LeagueCard from "@/components/LeagueCard";
import SearchBar from "@/components/SearchBar";

const PAGE_SIZE = 12;

interface LeaguesGridProps {
  leagues: ApiLeague[];
  showCityFilter?: boolean;
  showFavBtn?: boolean;
}

// ── Pagination helper ──────────────────────────────────────────────────────────

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [1];

  if (current > 3) pages.push("…");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("…");

  pages.push(total);
  return pages;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function LeaguesGrid({ leagues, showCityFilter = false, showFavBtn = false }: LeaguesGridProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Все города");
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  const cities = useMemo(
    () => ["Все города", ...Array.from(new Set(leagues.map((l) => l.city_name).filter(Boolean))).sort()],
    [leagues]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leagues.filter((l) => {
      const matchesCity = city === "Все города" || l.city_name === city;
      const matchesSearch =
        !q || l.name.toLowerCase().includes(q) || l.city_name?.toLowerCase().includes(q);
      return matchesCity && matchesSearch;
    });
  }, [leagues, search, city]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
    setAnimKey((k) => k + 1);
  }

  function handleCity(value: string) {
    setCity(value);
    setPage(1);
    setAnimKey((k) => k + 1);
  }

  function goTo(p: number) {
    setPage(p);
    setAnimKey((k) => k + 1);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Filters */}
      <div ref={topRef} className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 max-w-md">
          <SearchBar value={search} onChange={handleSearch} />
        </div>

        {showCityFilter && (
          <select
            value={city}
            onChange={(e) => handleCity(e.target.value)}
            className="px-4 py-3.5 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand-accent)]/50 cursor-pointer appearance-none pr-10 shrink-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236888a8'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              backgroundSize: "20px",
            }}
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
      </div>

      {/* Results count */}
      {filtered.length > 0 && (
        <p className="text-xs text-[var(--color-text-faint)] mb-5">
          Показано {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} из {filtered.length}
        </p>
      )}

      {/* Grid */}
      {pageItems.length > 0 ? (
        <>
          <div key={animKey} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {pageItems.map((league, i) => (
              <div
                key={league.id}
                className="card-enter"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <LeagueCard
                  slug={league.site_id}
                  name={league.name}
                  coverImage={apiImg(league.image)}
                  logoImage={apiImg(league.image)}
                  city={league.city_name}
                  showFavBtn={showFavBtn}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1.5 flex-wrap">
              {/* Prev */}
              <button
                onClick={() => goTo(safePage - 1)}
                disabled={safePage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-brand-accent)]/50 hover:text-[var(--color-brand-accent)] disabled:opacity-30 disabled:pointer-events-none transition-all"
                aria-label="Предыдущая страница"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
                </svg>
              </button>

              {/* Page numbers */}
              {getPageNumbers(safePage, totalPages).map((p, idx) =>
                p === "…" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-9 h-9 flex items-center justify-center text-[var(--color-text-faint)] text-sm select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goTo(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold border transition-all ${
                      safePage === p
                        ? "bg-[var(--color-brand-accent)] border-[var(--color-brand-accent)] text-white shadow-lg shadow-red-900/30"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-brand-accent)]/50 hover:text-[var(--color-brand-accent)]"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              {/* Next */}
              <button
                onClick={() => goTo(safePage + 1)}
                disabled={safePage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-brand-accent)]/50 hover:text-[var(--color-brand-accent)] disabled:opacity-30 disabled:pointer-events-none transition-all"
                aria-label="Следующая страница"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-24 text-[var(--color-text-faint)]">
          <svg viewBox="0 0 24 24" className="w-14 h-14 fill-current mx-auto mb-4 opacity-40">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <p className="text-xl font-semibold">Лиги не найдены</p>
          <p className="text-sm mt-2">Попробуйте другой город или запрос</p>
          <button
            onClick={() => { setSearch(""); setCity("Все города"); }}
            className="mt-4 text-sm text-[var(--color-brand-accent)] hover:underline"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </>
  );
}
