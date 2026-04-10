import Link from "next/link";
import { fetchLeagues } from "@/lib/api";
import LeaguesGrid from "@/components/LeaguesGrid";
import FavouritesStrip from "@/components/FavouritesStrip";

export default async function HomePage() {
  const leagues = await fetchLeagues();
  const cityCount = new Set(leagues.map((l) => l.city_name).filter(Boolean)).size;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden flex items-center py-10 sm:py-14">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#030810] via-[var(--color-brand-dark)] to-[var(--color-brand-blue)]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[var(--color-brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Football SVG — decorative, right side */}
        <svg
          viewBox="0 0 200 200"
          className="absolute right-[-20px] sm:right-[4%] top-1/2 -translate-y-1/2 w-52 h-52 sm:w-72 sm:h-72 opacity-[0.07] pointer-events-none select-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="95" fill="none" stroke="white" strokeWidth="4"/>
          {/* Pentagon patches */}
          <polygon points="100,10 120,35 111,62 89,62 80,35" fill="white"/>
          <polygon points="175,55 188,83 170,105 148,97 144,68" fill="white"/>
          <polygon points="165,148 148,168 122,162 118,138 140,122" fill="white"/>
          <polygon points="60,162 35,155 30,128 52,113 75,124" fill="white"/>
          <polygon points="25,100 12,72 32,52 56,62 57,90" fill="white"/>
          {/* Connecting lines */}
          <line x1="100" y1="10" x2="80" y2="35" stroke="white" strokeWidth="2"/>
          <line x1="100" y1="10" x2="120" y2="35" stroke="white" strokeWidth="2"/>
          <line x1="175" y1="55" x2="144" y2="68" stroke="white" strokeWidth="2"/>
          <line x1="175" y1="55" x2="148" y2="97" stroke="white" strokeWidth="2"/>
          <line x1="165" y1="148" x2="140" y2="122" stroke="white" strokeWidth="2"/>
          <line x1="165" y1="148" x2="122" y2="162" stroke="white" strokeWidth="2"/>
          <line x1="60" y1="162" x2="75" y2="124" stroke="white" strokeWidth="2"/>
          <line x1="60" y1="162" x2="30" y2="128" stroke="white" strokeWidth="2"/>
          <line x1="25" y1="100" x2="57" y2="90" stroke="white" strokeWidth="2"/>
          <line x1="25" y1="100" x2="32" y2="52" stroke="white" strokeWidth="2"/>
          <line x1="111" y1="62" x2="144" y2="68" stroke="white" strokeWidth="2"/>
          <line x1="89" y1="62" x2="57" y2="90" stroke="white" strokeWidth="2"/>
          <line x1="148" y1="97" x2="140" y2="122" stroke="white" strokeWidth="2"/>
          <line x1="118" y1="138" x2="75" y2="124" stroke="white" strokeWidth="2"/>
          <line x1="52" y1="113" x2="30" y2="128" stroke="white" strokeWidth="2"/>
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-brand-accent)]/15 border border-[var(--color-brand-accent)]/30 text-[var(--color-brand-accent)] text-sm font-semibold mb-5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-accent)] animate-pulse" />
            Любительский футбол России
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[var(--color-text-primary)] leading-tight tracking-tight mb-4">
            Найди свою{" "}
            <span className="text-[var(--color-brand-accent)]">лигу</span>
            <br />
            <span className="text-[var(--color-text-muted)]">и начни играть</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-xl mx-auto mb-7 leading-relaxed">
            Турниры, статистика, новости и результаты матчей — всё в одном месте.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#leagues"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-accent)] text-white font-bold text-base hover:bg-[var(--color-brand-accent-hover)] transition-all shadow-xl shadow-red-900/30 hover:-translate-y-0.5"
            >
              Найти лигу
            </a>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold text-base hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-all"
            >
              Подключить свою лигу
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 flex items-center justify-center gap-10 flex-wrap">
            {[
              { value: `${leagues.length}+`, label: "Лиг" },
              { value: `${cityCount}+`, label: "Городов" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-[var(--color-brand-accent)]">{stat.value}</div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leagues section */}
      <section id="leagues" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)]">
                Лиги
              </h2>
              <p className="text-[var(--color-text-muted)] mt-1">
                {leagues.length} лиг в {cityCount} городах
              </p>
            </div>
            <Link
              href="/leagues"
              className="text-sm font-semibold text-[var(--color-brand-accent)] hover:underline"
            >
              Все лиги →
            </Link>
          </div>

          <FavouritesStrip leagues={leagues} />
          <LeaguesGrid leagues={leagues} showFavBtn />
        </div>
      </section>

      {/* Connect CTA */}
      <section className="py-16 sm:py-20 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-dark)] p-10 sm:p-16 text-center">
            <div className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
            />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
                Управляете лигой?
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto mb-8">
                Подключите вашу лигу к платформе BARDIUZHENKO и получите удобные инструменты для управления турнирами, командами и статистикой.
              </p>
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-brand-accent)] text-white font-bold hover:bg-[var(--color-brand-accent-hover)] transition-all shadow-xl shadow-red-900/30 hover:-translate-y-0.5"
              >
                Подключить свою лигу
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
