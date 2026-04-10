"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const tabs = [
  {
    label: "Главная",
    href: "/",
    exact: true,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    label: "Лиги",
    href: "/leagues",
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
  },
  {
    label: "Новости",
    href: "/news",
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h12v2H6zm0 4h8v2H6z" />
      </svg>
    ),
  },
  {
    label: "Магазин",
    href: "/shop",
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.25 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    ),
  },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  const profileTab = {
    label: "Профиль",
    href: user ? "/profile" : "/auth/login",
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  };

  const allTabs = [...tabs, profileTab];
  const profileActive = pathname === "/profile" || pathname.startsWith("/auth");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--color-brand-dark)]/95 backdrop-blur-md border-t border-[var(--color-border-light)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch">
        {allTabs.map((tab) => {
          const active = tab.label === "Профиль"
            ? profileActive
            : isActive(tab.href, tab.exact);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-w-0 select-none
                active:scale-90 transition-transform duration-150
                ${active ? "text-[var(--color-brand-accent)]" : "text-[var(--color-text-faint)]"}`}
            >
              {/* Active dot indicator */}
              <span
                className={`w-1 h-1 rounded-full bg-[var(--color-brand-accent)] mb-0.5 transition-all duration-200 ${
                  active ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
              />
              {tab.icon}
              <span className="text-[10px] font-medium leading-none truncate w-full text-center px-0.5">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
