import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchGlobalNews, fetchLeagues, apiImg, stripNewsMarkup } from "@/lib/api";

export const revalidate = 60;

export const metadata: Metadata = { title: "Новости" };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default async function GlobalNewsPage() {
  const [articles, leagues] = await Promise.all([fetchGlobalNews(), fetchLeagues()]);

  // Map client id → slug for linking articles to league news detail
  const slugMap = new Map(leagues.map((l) => [l.id, l.site_id]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[var(--color-text-primary)]">Новости</h1>
        <p className="text-[var(--color-text-muted)] mt-1">{articles.length} материалов</p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => {
            const slug = slugMap.get(article.client_owner);
            const image = apiImg(article.image);
            const excerpt = stripNewsMarkup(article.text).slice(0, 120);
            const inner = (
              <>
                <div className="relative h-44 bg-[var(--color-surface-elevated)] overflow-hidden">
                  {image ? (
                    <Image
                      src={image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-blue)]/20 to-[var(--color-surface-elevated)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-faint)] mb-2">
                    <span>{formatDate(article.created_at)}</span>
                    <span>·</span>
                    <span>{article.client_name}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[var(--color-text-primary)] leading-snug line-clamp-2 group-hover:text-[var(--color-brand-accent)] transition-colors mb-2">
                    {article.title}
                  </h3>
                  {excerpt && (
                    <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                      {excerpt}
                    </p>
                  )}
                </div>
              </>
            );

            const cardClass =
              "group block rounded-2xl overflow-hidden bg-[var(--color-surface-card)] border border-[var(--color-border-light)] hover:border-[var(--color-brand-accent)]/30 transition-all hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5";

            return slug ? (
              <Link key={article.id} href={`/leagues/${slug}/news/${article.id}`} className={cardClass}>
                {inner}
              </Link>
            ) : (
              <div key={article.id} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-[var(--color-text-faint)]">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current mx-auto mb-4 opacity-40">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
          </svg>
          <p className="text-lg font-semibold">Новостей пока нет</p>
        </div>
      )}
    </div>
  );
}
