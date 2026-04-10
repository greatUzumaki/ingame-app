"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Пароли не совпадают");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }
    setLoading(true);
    const result = register(name, email, password);
    setLoading(false);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error ?? "Ошибка регистрации");
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-accent)] flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,8 16,12 10,16" fill="white"/>
              </svg>
            </div>
            <h1 className="text-2xl font-black text-[var(--color-text-primary)]">Регистрация</h1>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">Создайте аккаунт BARDIUZHENKO</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-lg bg-[var(--color-brand-accent)]/10 border border-[var(--color-brand-accent)]/30 text-[var(--color-brand-accent)] text-sm">
                {error}
              </div>
            )}

            {[
              { label: "Ваше имя", value: name, setter: setName, type: "text", placeholder: "Иван Иванов", required: true },
              { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "your@email.com", required: true },
              { label: "Пароль", value: password, setter: setPassword, type: "password", placeholder: "Минимум 6 символов", required: true },
              { label: "Подтверждение пароля", value: confirm, setter: setConfirm, type: "password", placeholder: "••••••••", required: true },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">{field.label}</label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-brand-accent)]/50 focus:ring-1 focus:ring-[var(--color-brand-accent)]/30 transition-all text-sm"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[var(--color-brand-accent)] text-white font-bold text-sm hover:bg-[var(--color-brand-accent-hover)] transition-all shadow-lg shadow-red-900/20 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] mt-2"
            >
              {loading ? "Регистрируем..." : "Создать аккаунт"}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--color-text-faint)] mt-6">
            Уже есть аккаунт?{" "}
            <Link href="/auth/login" className="text-[var(--color-brand-accent)] hover:underline font-semibold">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
