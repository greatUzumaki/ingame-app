import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border-light)] mt-auto pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[var(--color-brand-accent)] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,8 16,12 10,16" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-[var(--color-text-primary)]">
              BARDI<span className="text-[var(--color-brand-accent)]">UZHENKO</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
            <Link href="/leagues" className="hover:text-[var(--color-text-primary)] transition-colors">Лиги</Link>
            <Link href="/connect" className="hover:text-[var(--color-text-primary)] transition-colors">Подключить лигу</Link>
          </nav>

          <span className="text-xs text-[var(--color-text-faint)]">
            © {year} BARDIUZHENKO
          </span>
        </div>
      </div>
    </footer>
  );
}
