import type { Metadata } from "next";

export const metadata: Metadata = { title: "Новости" };

export default function NewsPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
      <svg viewBox="0 0 24 24" className="w-16 h-16 fill-[var(--color-text-faint)] mb-6 opacity-40">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h12v2H6zm0 4h8v2H6z"/>
      </svg>
      <h1 className="text-2xl font-black text-[var(--color-text-primary)] mb-2">Новости</h1>
      <p className="text-[var(--color-text-muted)]">Скоро здесь появятся новости</p>
    </div>
  );
}
