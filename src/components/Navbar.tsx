"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-brand-dark)]/90 border-b border-[var(--color-border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" onClick={close} className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-accent)] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="white" opacity="0.3"/>
                <polygon points="10,8 16,12 10,16" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-[var(--color-text-primary)]">
              BARDI<span className="text-[var(--color-brand-accent)]">UZHENKO</span>
            </span>
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/leagues" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
              Лиги
            </Link>
            <Link href="/connect" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
              Подключить лигу
            </Link>
          </nav>

          {/* Auth — desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-[var(--color-text-muted)]">
                  👋 <span className="text-[var(--color-text-primary)] font-medium">{user.name.split(" ")[0]}</span>
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-[var(--color-text-faint)] hover:text-[var(--color-brand-accent)] transition-colors"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors px-3 py-2"
                >
                  Вход
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm font-semibold bg-[var(--color-brand-accent)] text-white hover:bg-[var(--color-brand-accent-hover)] transition-colors px-4 py-2 rounded-lg"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>

          {/* Burger button — hidden on mobile (bottom nav handles it), visible between sm–md if needed */}
          <button
            className="hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-white/5 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {/* Bar 1 — rotates to top of × */}
            <span
              className={`block w-5 h-[2px] bg-current rounded-full origin-center transition-all duration-300 ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            {/* Bar 2 — fades out */}
            <span
              className={`block w-5 h-[2px] bg-current rounded-full transition-all duration-300 ${
                open ? "opacity-0 scale-x-0" : ""
              }`}
            />
            {/* Bar 3 — rotates to bottom of × */}
            <span
              className={`block w-5 h-[2px] bg-current rounded-full origin-center transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 md:hidden bg-[var(--color-surface)] border-b border-[var(--color-border-light)] transition-all duration-300 ease-in-out ${
          open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-5 flex flex-col gap-1">
          {/* Nav links */}
          <Link
            href="/leagues"
            onClick={close}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-white/5 transition-all font-medium"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current opacity-60 shrink-0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            Лиги
          </Link>
          <Link
            href="/connect"
            onClick={close}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-white/5 transition-all font-medium"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current opacity-60 shrink-0">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
            Подключить лигу
          </Link>

          <div className="my-2 border-t border-[var(--color-border-light)]" />

          {/* Auth */}
          {user ? (
            <>
              <div className="px-3 py-2 text-sm text-[var(--color-text-muted)]">
                👋 <span className="text-[var(--color-text-primary)] font-medium">{user.name}</span>
              </div>
              <button
                onClick={() => { logout(); close(); }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent)]/10 transition-all font-medium text-sm text-left"
              >
                Выйти
              </button>
            </>
          ) : (
            <div className="flex gap-2 pt-1">
              <Link
                href="/auth/login"
                onClick={close}
                className="flex-1 text-center py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-all"
              >
                Вход
              </Link>
              <Link
                href="/auth/register"
                onClick={close}
                className="flex-1 text-center py-2.5 rounded-xl bg-[var(--color-brand-accent)] text-sm font-semibold text-white hover:bg-[var(--color-brand-accent-hover)] transition-all"
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
