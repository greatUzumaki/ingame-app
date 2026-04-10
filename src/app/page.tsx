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
      <section className="relative overflow-hidden min-h-[560px] flex items-center">
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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--color-brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-brand-accent)]/15 border border-[var(--color-brand-accent)]/30 text-[var(--color-brand-accent)] text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-accent)] animate-pulse" />
            Любительский футбол России
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[var(--color-text-primary)] leading-tight tracking-tight mb-6">
            Найди свою{" "}
            <span className="text-[var(--color-brand-accent)]">лигу</span>
            <br />
            <span className="text-[var(--color-text-muted)]">и начни играть</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Платформа для любительских футбольных лиг. Турниры, статистика, новости и результаты матчей — всё в одном месте.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#leagues"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-brand-accent)] text-white font-bold text-lg hover:bg-[var(--color-brand-accent-hover)] transition-all shadow-xl shadow-red-900/30 hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              Найти лигу
            </a>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold text-lg hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-all"
            >
              Подключить свою лигу
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex items-center justify-center gap-12 flex-wrap">
            {[
              { value: `${leagues.length}+`, label: "Лиг" },
              { value: `${cityCount}+`, label: "Городов" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-[var(--color-brand-accent)]">{stat.value}</div>
                <div className="text-sm text-[var(--color-text-muted)] mt-1">{stat.label}</div>
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
