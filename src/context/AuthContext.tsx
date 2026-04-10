"use client";

import { createContext, useContext, useCallback, useSyncExternalStore, ReactNode } from "react";
import { validateCredentials, emailExists, createUser } from "@/data/users";

interface SessionUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "ingame_session";

// ── External store wiring ──────────────────────────────────────────────────────

const authSubscribers = new Set<() => void>();

function notifyAuth() {
  authSubscribers.forEach((fn) => fn());
}

function subscribeAuth(callback: () => void) {
  authSubscribers.add(callback);
  return () => authSubscribers.delete(callback);
}

let _sessionRaw: string | null = undefined as unknown as null;
let _sessionParsed: SessionUser | null = null;

function readSession(): SessionUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw === _sessionRaw) return _sessionParsed;
    _sessionRaw = raw;
    _sessionParsed = raw ? (JSON.parse(raw) as SessionUser) : null;
    return _sessionParsed;
  } catch {
    return null;
  }
}

// ── Provider ───────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore: no useState/useEffect needed, no hydration mismatch,
  // no "synchronous setState in effect" warning.
  // getServerSnapshot returns null so server+initial client render both render null.
  const user = useSyncExternalStore(subscribeAuth, readSession, () => null);

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    const found = validateCredentials(email, password);
    if (!found) return { success: false, error: "Неверный email или пароль" };
    const session: SessionUser = { id: found.id, name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    notifyAuth();
    return { success: true };
  }, []);

  const register = useCallback((name: string, email: string, password: string): { success: boolean; error?: string } => {
    if (emailExists(email)) return { success: false, error: "Email уже зарегистрирован" };
    const newUser = createUser(name, email, password);
    const session: SessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    notifyAuth();
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    notifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
