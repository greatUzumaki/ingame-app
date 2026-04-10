import type { Metadata } from "next";

export const metadata: Metadata = { title: "Магазин" };

export default function ShopPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
      <svg viewBox="0 0 24 24" className="w-16 h-16 fill-[var(--color-text-faint)] mb-6 opacity-40">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.25 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
      <h1 className="text-2xl font-black text-[var(--color-text-primary)] mb-2">Магазин</h1>
      <p className="text-[var(--color-text-muted)]">Скоро здесь появится магазин</p>
    </div>
  );
}
