import Image from "next/image";
import type { ApiPartner } from "@/lib/api";
import { apiImg } from "@/lib/api";

interface PartnerCardProps {
  partner: ApiPartner;
}

const cardClass = (hasHref: boolean) =>
  `group block rounded-xl overflow-hidden bg-[var(--color-surface-card)] border border-[var(--color-border-light)] p-5 flex flex-col items-center gap-3 text-center transition-all${hasHref ? " hover:border-[var(--color-brand-accent)]/30 hover:shadow-lg cursor-pointer" : ""}`;

function CardContent({ partner }: { partner: ApiPartner }) {
  const image = apiImg(partner.image);
  return (
    <>
      <div className="relative w-32 h-16 rounded-lg overflow-hidden bg-[var(--color-surface-elevated)] flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={partner.name}
            fill
            className="object-contain p-2"
            sizes="128px"
          />
        ) : (
          <span className="text-[var(--color-text-faint)] text-lg font-black">{partner.name.charAt(0)}</span>
        )}
      </div>
      <div>
        <p className="font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-accent)] transition-colors">
          {partner.name}
        </p>
        {partner.description && (
          <p className="text-xs text-[var(--color-text-faint)] mt-1">{partner.description}</p>
        )}
        {partner.href && (
          <p className="text-xs text-[var(--color-brand-accent)] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Перейти на сайт →
          </p>
        )}
      </div>
    </>
  );
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  if (partner.href) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass(true)}
      >
        <CardContent partner={partner} />
      </a>
    );
  }

  return (
    <div className={cardClass(false)}>
      <CardContent partner={partner} />
    </div>
  );
}
