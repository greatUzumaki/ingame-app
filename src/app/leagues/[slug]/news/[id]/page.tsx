import { resolveLeagueId, fetchNews, apiImg, stripNewsMarkup } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, id } = await params;
  const resolved = await resolveLeagueId(slug);
  if (!resolved) return { title: "Новость не найдена" };
  const articles = await fetchNews(resolved.id);
  const article = articles.find((a) => String(a.id) === id);
  return article ? { title: article.title } : { title: "Новость не найдена" };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ArticlePage({ params }: Props) {
  const { slug, id } = await params;
  const resolved = await resolveLeagueId(slug);
  if (!resolved) notFound();

  const articles = await fetchNews(resolved.id);
  const article = articles.find((a) => String(a.id) === id);
  if (!article) notFound();

  const image = apiImg(article.image);
  const body = stripNewsMarkup(article.text);

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href={`/leagues/${slug}/news`} className="text-sm text-[var(--color-text-faint)] hover:text-[var(--color-brand-accent)] transition-colors">
          ← Все новости
        </Link>
      </div>

      {/* Cover */}
      {image && (
        <div className="relative h-56 sm:h-80 rounded-2xl overflow-hidden bg-[var(--color-surface-elevated)] mb-8">
          <Image
            src={image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 text-sm text-[var(--color-text-faint)] mb-4 flex-wrap">
        <span>{formatDate(article.created_at)}</span>
        <span>·</span>
        <span>{article.client_name}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] leading-tight mb-6">
        {article.title}
      </h1>

      {/* Body */}
      <div className="text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line">
        {body}
      </div>
    </div>
  );
}
