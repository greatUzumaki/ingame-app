"use client";

import { useState, FormEvent } from "react";

export default function ConnectPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)]">
          Подключить свою лигу
        </h1>
        <p className="text-[var(--color-text-muted)] mt-3 leading-relaxed">
          Расскажите нам о вашей лиге — мы свяжемся с вами и поможем настроить всё необходимое для выхода на платформу BARDIUZHENKO.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-2xl bg-[var(--color-surface-card)] border border-emerald-500/30 p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-emerald-400">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Заявка отправлена!</h2>
          <p className="text-[var(--color-text-muted)] text-sm">
            Мы свяжемся с вами по email <strong className="text-[var(--color-text-primary)]">{contactEmail}</strong> в течение 1-2 рабочих дней.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] p-8">
          {[
            { label: "Название лиги *", value: name, setter: setName, type: "text", placeholder: "Городская Лига Футбола", required: true },
            { label: "Город *", value: city, setter: setCity, type: "text", placeholder: "Москва", required: true },
            { label: "Email для связи *", value: contactEmail, setter: setContactEmail, type: "email", placeholder: "liga@example.ru", required: true },
            { label: "Телефон", value: phone, setter: setPhone, type: "tel", placeholder: "+7 (000) 000-00-00", required: false },
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

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
              Расскажите о лиге
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Сколько команд, какой формат, как давно существует..."
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-brand-accent)]/50 focus:ring-1 focus:ring-[var(--color-brand-accent)]/30 transition-all text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[var(--color-brand-accent)] text-white font-bold hover:bg-[var(--color-brand-accent-hover)] transition-all shadow-lg shadow-red-900/20 active:scale-[0.99]"
          >
            Отправить заявку
          </button>
        </form>
      )}
    </div>
  );
}
