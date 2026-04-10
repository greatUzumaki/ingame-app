import { notFound } from "next/navigation";
import Image from "next/image";
import { resolveLeagueId, apiImg } from "@/lib/api";
import TabNav from "@/components/TabNav";
import ScrollReset from "@/components/ScrollReset";
import FavouriteButton from "@/components/FavouriteButton";
import type { Metadata } from "next";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await resolveLeagueId(slug);
  if (!result) return { title: "Лига не найдена" };
  return { title: result.league.name };
}

export default async function LeagueLayout({ children, params }: Props) {
  const { slug } = await params;
  const result = await resolveLeagueId(slug);

  if (!result) notFound();

  const { league } = result;
  const image = apiImg(league.image);

  return (
    <>
      {/* Cover banner */}
      <div className="relative h-52 sm:h-72 bg-[var(--color-surface-elevated)] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={league.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-blue)]/30 to-[var(--color-surface-elevated)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-dark)] via-[var(--color-brand-dark)]/40 to-transparent" />

        {/* Favourite button */}
        <div className="absolute top-3 right-3 z-10">
          <FavouriteButton slug={slug} />
        </div>

        {/* League header info */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5">
          <div className="flex items-end gap-4">
            {/* Logo */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[var(--color-border)] shadow-xl shrink-0 bg-[var(--color-surface-elevated)]">
              {image ? (
                <Image
                  src={image}
                  alt={`${league.name} logo`}
                  fill
                  className="object-contain p-1.5"
                  sizes="80px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-faint)] text-2xl font-black">
                  {league.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="pb-1">
              <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {league.city_name}
              </span>
              <h1 className="text-xl sm:text-3xl font-black text-white mt-1 drop-shadow-lg">
                {league.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <ScrollReset />
      {/* Tab navigation */}
      <TabNav slug={slug} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </div>
    </>
  );
}
