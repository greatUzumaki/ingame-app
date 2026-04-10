import Link from "next/link";
import Image from "next/image";
import type { ApiNewsArticle } from "@/lib/api";
import { apiImg, stripNewsMarkup } from "@/lib/api";

interface NewsCardProps {
  article: ApiNewsArticle;
  leagueSlug: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default function NewsCard({ article, leagueSlug }: NewsCardProps) {
  const image = apiImg(article.image);
  const excerpt = stripNewsMarkup(article.text).slice(0, 120);

  return (
    <Link
      href={`/leagues/${leagueSlug}/news/${article.id}`}
      className="group block rounded-2xl overflow-hidden bg-[var(--color-surface-card)] border border-[var(--color-border-light)] hover:border-[var(--color-brand-accent)]/30 transition-all hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
    >
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
    </Link>
  );
}
