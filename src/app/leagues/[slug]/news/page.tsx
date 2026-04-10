import { resolveLeagueId, fetchNews } from "@/lib/api";
import NewsCard from "@/components/NewsCard";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function NewsPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveLeagueId(slug);
  if (!resolved) notFound();

  const articles = await fetchNews(resolved.id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[var(--color-text-primary)]">Новости</h2>
        <p className="text-[var(--color-text-muted)] mt-1">{articles.length} материалов</p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} leagueSlug={slug} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[var(--color-text-faint)]">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current mx-auto mb-4 opacity-40">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
          </svg>
          <p className="text-lg font-semibold">Новостей пока нет</p>
        </div>
      )}
    </div>
  );
}
