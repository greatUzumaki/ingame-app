import { resolveLeagueId, fetchLeague, type ApiSocial } from "@/lib/api";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

function normalizeSocialUrl(name: string, value: string): string {
  if (value.startsWith("http")) return value;
  if (value.startsWith("//")) return `https:${value}`;
  // Handle-only values (@username or plain text)
  if (name === "youtube") return `https://youtube.com/${value.startsWith("@") ? value : "@" + value}`;
  if (name === "telegram") return `https://t.me/${value.startsWith("@") ? value.slice(1) : value}`;
  if (name === "vk") return `https://vk.com/${value.startsWith("@") ? value.slice(1) : value}`;
  if (name === "instagram") return `https://instagram.com/${value.startsWith("@") ? value.slice(1) : value}`;
  return `https://${value}`;
}

const SOCIAL_LABELS: Record<string, string> = {
  vk: "ВКонтакте",
  youtube: "YouTube",
  telegram: "Telegram",
  instagram: "Instagram",
  twitter: "Twitter / X",
  facebook: "Facebook",
  tiktok: "TikTok",
};

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "vk":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
          <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.55c-.58 0-.76-.46-1.81-1.53-.91-.9-1.3-.9-1.52-.9-.31 0-.4.09-.4.52v1.4c0 .37-.12.59-1.1.59-1.62 0-3.41-.98-4.68-2.8C5.86 10.76 5.5 9.01 5.5 8.63c0-.22.09-.43.52-.43h1.55c.39 0 .54.18.69.6.76 2.2 2.03 4.13 2.56 4.13.2 0 .29-.09.29-.58V10.2c-.06-1.04-.61-1.13-.61-1.5 0-.18.15-.37.39-.37h2.44c.33 0 .45.18.45.55v2.96c0 .33.15.45.24.45.2 0 .37-.12.74-.49 1.14-1.28 1.96-3.24 1.96-3.24.11-.22.29-.43.68-.43h1.55c.46 0 .56.24.46.55-.19.88-2.06 3.53-2.06 3.53-.16.27-.22.39 0 .69.16.22.68.67 1.03 1.08.64.73 1.13 1.34 1.26 1.76.13.41-.09.62-.51.62z"/>
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
          <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.19-1.97 9.28c-.15.66-.54.82-1.08.51l-3-2.21-1.45 1.4c-.16.16-.3.3-.61.3l.21-3.04 5.51-4.98c.24-.21-.05-.33-.37-.12L6.55 14.09l-2.96-.92c-.64-.2-.65-.64.14-.95l11.57-4.46c.53-.19 1 .13.64.43z"/>
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
        </svg>
      );
  }
}

function SocialLink({ social }: { social: ApiSocial }) {
  const url = normalizeSocialUrl(social.social_name, social.social_value);
  const label = SOCIAL_LABELS[social.social_name] ?? social.social_name;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border-light)] hover:border-[var(--color-brand-accent)]/30 hover:bg-[var(--color-surface-elevated)] transition-all text-[var(--color-text-primary)]"
    >
      <SocialIcon name={social.social_name} />
      <span className="font-semibold">{label}</span>
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[var(--color-text-faint)] ml-auto shrink-0">
        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
      </svg>
    </a>
  );
}

export default async function ContactsPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveLeagueId(slug);
  if (!resolved) notFound();

  const detail = await fetchLeague(resolved.id);
  const socials = detail?.socials ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-[var(--color-text-primary)]">Контакты</h2>
        <p className="text-[var(--color-text-muted)] mt-1">Свяжитесь с организаторами лиги</p>
      </div>

      {socials.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-[var(--color-text-primary)]">Мы в социальных сетях</h3>
          <div className="space-y-2">
            {socials.map((s) => (
              <SocialLink key={s.social_id} social={s} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-[var(--color-text-faint)]">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current mx-auto mb-4 opacity-40">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <p className="text-lg font-semibold">Контактная информация не указана</p>
        </div>
      )}
    </div>
  );
}
