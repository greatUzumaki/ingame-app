import Link from "next/link";
import Image from "next/image";
import FavouriteButton from "@/components/FavouriteButton";

interface LeagueCardProps {
  slug: string;
  name: string;
  coverImage: string;
  logoImage: string;
  city: string;
  showFavBtn?: boolean;
}

export default function LeagueCard({ slug, name, coverImage, logoImage, city, showFavBtn = false }: LeagueCardProps) {
  return (
    <Link
      href={`/leagues/${slug}`}
      className="group flex flex-col h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[var(--color-surface-card)] border border-[var(--color-border-light)] hover:border-[var(--color-brand-accent)]/40 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-brand-accent)]/10 hover:-translate-y-1 min-w-0"
    >
      {/* Cover image */}
      <div className="relative h-28 sm:h-40 overflow-hidden bg-[var(--color-surface-elevated)]">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-blue)]/30 to-[var(--color-surface-elevated)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-card)] via-transparent to-transparent opacity-80" />
        {showFavBtn && <FavouriteButton slug={slug} />}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          {/* Logo */}
          <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-[var(--color-border)] shadow-md -mt-6 sm:-mt-8 bg-[var(--color-surface-elevated)]">
            {logoImage ? (
              <Image
                src={logoImage}
                alt={`${name} logo`}
                fill
                className="object-contain p-1"
                sizes="48px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-faint)] text-base font-black">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 mt-0.5">
            <h3 className="font-bold text-[var(--color-text-primary)] text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-[var(--color-brand-accent)] transition-colors">
              {name}
            </h3>
          </div>
        </div>

        <div className="mt-2 sm:mt-3 flex-1 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-[var(--color-text-muted)] min-w-0">
            <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="truncate">{city}</span>
          </span>
        </div>

        <div className="mt-2 sm:mt-4 flex items-center justify-end">
          <span className="text-[10px] sm:text-xs font-semibold text-[var(--color-brand-accent)] flex items-center gap-0.5 sm:gap-1">
            Подробнее
            <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current group-hover:translate-x-0.5 transition-transform">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
