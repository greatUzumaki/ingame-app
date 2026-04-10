"use client";

import { createContext, useContext, useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "ingame_favourites";

interface FavouritesContextValue {
  favourites: string[];
  toggle: (slug: string) => void;
  isFavourite: (slug: string) => boolean;
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

// ── External store wiring ──────────────────────────────────────────────────────

const favSubscribers = new Set<() => void>();

function notifyFav() {
  favSubscribers.forEach((fn) => fn());
}

function subscribeFav(callback: () => void) {
  favSubscribers.add(callback);
  return () => favSubscribers.delete(callback);
}

const EMPTY: string[] = [];
let _favsRaw: string | null = undefined as unknown as null;
let _favsParsed: string[] = EMPTY;

function readFavourites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === _favsRaw) return _favsParsed;
    _favsRaw = raw;
    _favsParsed = raw ? (JSON.parse(raw) as string[]) : EMPTY;
    return _favsParsed;
  } catch {
    return EMPTY;
  }
}

// ── Provider ───────────────────────────────────────────────────────────────────

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const favourites = useSyncExternalStore(subscribeFav, readFavourites, () => EMPTY);

  const toggle = useCallback((slug: string) => {
    const current = readFavourites();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    notifyFav();
  }, []);

  const isFavourite = useCallback((slug: string) => favourites.includes(slug), [favourites]);

  return (
    <FavouritesContext.Provider value={{ favourites, toggle, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites(): FavouritesContextValue {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used inside FavouritesProvider");
  return ctx;
}
