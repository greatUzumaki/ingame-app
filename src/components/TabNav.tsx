"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  label: string;
  href: string;
}

interface TabNavProps {
  slug: string;
}

export default function TabNav({ slug }: TabNavProps) {
  const pathname = usePathname();

  const tabs: Tab[] = [
    { label: "Главная", href: `/leagues/${slug}` },
    { label: "Турниры", href: `/leagues/${slug}/tournaments` },
    { label: "Новости", href: `/leagues/${slug}/news` },
    { label: "Партнеры", href: `/leagues/${slug}/partners` },
    { label: "Контакты", href: `/leagues/${slug}/contacts` },
  ];

  function isActive(href: string): boolean {
    if (href === `/leagues/${slug}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }

  return (
    <div className="bg-[var(--color-surface)] border-b border-[var(--color-border-light)] sticky top-16 z-30">
      {/* No horizontal padding — tabs bleed edge to edge and scroll off-screen */}
      <nav className="flex gap-1 overflow-x-auto scrollbar-none">
        {/* Left breathing room as a non-shrinking spacer on larger screens */}
        <div className="shrink-0 w-4 sm:w-6 lg:w-8" />
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative shrink-0 px-4 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
              isActive(tab.href)
                ? "text-[var(--color-brand-accent)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {tab.label}
            {isActive(tab.href) && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-brand-accent)] rounded-full" />
            )}
          </Link>
        ))}
        <div className="shrink-0 w-4" />
      </nav>
    </div>
  );
}
