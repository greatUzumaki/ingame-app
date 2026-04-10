interface SocialLinksProps {
  vk?: string;
  telegram?: string;
  instagram?: string;
}

export default function SocialLinks({ vk, telegram, instagram }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-3">
      {vk && (
        <a
          href={vk}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[var(--color-brand-accent)]/50 flex items-center justify-center transition-all hover:bg-[#4C6FA5] group"
          aria-label="VKontakte"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[var(--color-text-muted)] group-hover:fill-white transition-colors">
            <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm2.85 13.6h-1.5c-.57 0-.74-.45-1.76-1.49-.89-.87-1.28-.98-1.5-.98-.31 0-.4.09-.4.52v1.36c0 .37-.12.59-1.11.59-1.64 0-3.46-1-4.74-2.85C5.56 10.57 5 8.74 5 8.37c0-.22.09-.42.52-.42h1.5c.39 0 .53.17.68.59.74 2.14 1.99 4.02 2.5 4.02.19 0 .28-.09.28-.59V9.53c-.06-1.06-.62-1.15-.62-1.53 0-.18.15-.37.39-.37h2.36c.33 0 .44.17.44.55v2.97c0 .33.15.44.24.44.19 0 .35-.11.7-.46C14.6 9.97 15.53 8.2 15.53 8.2c.11-.22.31-.42.7-.42h1.5c.45 0 .55.23.45.55-.19.88-2.01 3.45-2.01 3.45-.16.26-.22.37 0 .66.15.2.67.68 1.01 1.08.63.7 1.1 1.28 1.23 1.68.13.39-.08.6-.49.6z"/>
          </svg>
        </a>
      )}
      {telegram && (
        <a
          href={telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[var(--color-brand-accent)]/50 flex items-center justify-center transition-all hover:bg-[#0088CC] group"
          aria-label="Telegram"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[var(--color-text-muted)] group-hover:fill-white transition-colors">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </a>
      )}
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[var(--color-brand-accent)]/50 flex items-center justify-center transition-all hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 group"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[var(--color-text-muted)] group-hover:fill-white transition-colors">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      )}
    </div>
  );
}
