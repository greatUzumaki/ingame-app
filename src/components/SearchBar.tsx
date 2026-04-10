"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Поиск по лиге или городу..." }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[var(--color-text-faint)]">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-brand-accent)]/50 focus:ring-1 focus:ring-[var(--color-brand-accent)]/30 transition-all text-sm"
      />
      {value && (
        <button
          className="absolute inset-y-0 right-4 flex items-center text-[var(--color-text-faint)] hover:text-[var(--color-text-primary)] transition-colors"
          onClick={() => onChange("")}
          aria-label="Очистить поиск"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      )}
    </div>
  );
}
