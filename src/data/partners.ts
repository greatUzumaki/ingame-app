export interface Partner {
  id: string;
  leagueSlug: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
}

export const partners: Partner[] = [
  // Moscow Premier League
  { id: "p1", leagueSlug: "moscow-premier-league", name: "Адидас Москва", logo: "https://placehold.co/200x100/1F3E76/ffffff?text=Adidas", website: "https://www.adidas.ru", description: "Официальный поставщик экипировки" },
  { id: "p2", leagueSlug: "moscow-premier-league", name: "Ника Спорт", logo: "https://placehold.co/200x100/FD3647/ffffff?text=Ника+Спорт", website: "https://example.com", description: "Спортивный магазин-партнёр" },
  { id: "p3", leagueSlug: "moscow-premier-league", name: "Burger King", logo: "https://placehold.co/200x100/FF8C00/ffffff?text=Burger+King", website: "https://burgerking.ru", description: "Официальный ресторан лиги" },
  { id: "p4", leagueSlug: "moscow-premier-league", name: "Спортмастер", logo: "https://placehold.co/200x100/25153E/ffffff?text=Спортмастер", website: "https://sportmaster.ru" },

  // St. Petersburg League
  { id: "p5", leagueSlug: "spb-football-league", name: "Газпром Нефть", logo: "https://placehold.co/200x100/003087/ffffff?text=Газпром", website: "https://example.com", description: "Генеральный спонсор" },
  { id: "p6", leagueSlug: "spb-football-league", name: "Decathlon СПб", logo: "https://placehold.co/200x100/0082C8/ffffff?text=Decathlon", website: "https://decathlon.ru" },
  { id: "p7", leagueSlug: "spb-football-league", name: "Пивоварня Балтика", logo: "https://placehold.co/200x100/004B23/ffffff?text=Балтика", website: "https://example.com", description: "Напиток лиги" },

  // Kazan Futsal
  { id: "p8", leagueSlug: "kazan-futsal", name: "ТАИФ", logo: "https://placehold.co/200x100/6b2d8b/ffffff?text=ТАИФ", website: "https://example.com", description: "Генеральный спонсор" },
  { id: "p9", leagueSlug: "kazan-futsal", name: "KazanExpress", logo: "https://placehold.co/200x100/ff6600/ffffff?text=KazanExpress", website: "https://example.com" },

  // Ekaterinburg
  { id: "p10", leagueSlug: "ekb-city-league", name: "Уральская Сталь", logo: "https://placehold.co/200x100/0f3460/ffffff?text=Урал+Сталь", website: "https://example.com" },
  { id: "p11", leagueSlug: "ekb-city-league", name: "Магнит Спорт", logo: "https://placehold.co/200x100/CC0000/ffffff?text=Магнит", website: "https://example.com" },

  // Novosibirsk
  { id: "p12", leagueSlug: "nsk-amateur-football", name: "Сибирь Телеком", logo: "https://placehold.co/200x100/1a3a4a/ffffff?text=Сибирь+Телеком", website: "https://example.com" },

  // Krasnodar
  { id: "p13", leagueSlug: "krasnodar-liga", name: "Краснодарский Край Спорт", logo: "https://placehold.co/200x100/2d5a1b/ffffff?text=КК+Спорт", website: "https://example.com" },
  { id: "p14", leagueSlug: "krasnodar-liga", name: "Агрокомплекс Кубань", logo: "https://placehold.co/200x100/FD3647/ffffff?text=Агрокомплекс", website: "https://example.com" },

  // Moscow Futsal Pro
  { id: "p15", leagueSlug: "moscow-futsal-pro", name: "Nike Russia", logo: "https://placehold.co/200x100/111111/ffffff?text=Nike", website: "https://nike.com/ru" },
  { id: "p16", leagueSlug: "moscow-futsal-pro", name: "Red Bull", logo: "https://placehold.co/200x100/CC1100/ffffff?text=Red+Bull", website: "https://example.com" },
];

export function getPartnersByLeague(leagueSlug: string): Partner[] {
  return partners.filter((p) => p.leagueSlug === leagueSlug);
}
