export interface LeagueContacts {
  leagueSlug: string;
  contactName: string;
  phone?: string;
  email?: string;
  address?: string;
  social: {
    vk?: string;
    telegram?: string;
    instagram?: string;
  };
}

export const contacts: LeagueContacts[] = [
  {
    leagueSlug: "moscow-premier-league",
    contactName: "Организационный отдел МПЛ",
    phone: "+7 (495) 123-45-67",
    email: "info@mpl-moscow.ru",
    address: "г. Москва, ул. Сокольническая, д. 5, стадион «Сокольники Арена»",
    social: {
      vk: "https://vk.com/mpl_moscow",
      telegram: "https://t.me/mpl_moscow",
      instagram: "https://instagram.com/mpl_moscow",
    },
  },
  {
    leagueSlug: "spb-football-league",
    contactName: "Дирекция Санкт-Петербургской ФЛ",
    phone: "+7 (812) 987-65-43",
    email: "liga@spb-football.ru",
    address: "г. Санкт-Петербург, Приморский пр., 72, СК «Приморский»",
    social: {
      vk: "https://vk.com/spb_football_liga",
      telegram: "https://t.me/spb_futbol",
    },
  },
  {
    leagueSlug: "ekb-city-league",
    contactName: "Оргкомитет ГЛЕ",
    phone: "+7 (343) 456-78-90",
    email: "gle@ekb-sport.ru",
    address: "г. Екатеринбург, ул. Большакова, 105, СК «Уральский»",
    social: {
      vk: "https://vk.com/gle_ekb",
      telegram: "https://t.me/gle_ekb",
    },
  },
  {
    leagueSlug: "kazan-futsal",
    contactName: "Казанская Лига Мини-Футбола",
    phone: "+7 (843) 321-00-55",
    email: "klm@kazan-futsal.ru",
    address: "г. Казань, ул. Декабристов, 1, СК «Казань Арена Лайт»",
    social: {
      vk: "https://vk.com/kazan_futsal",
      telegram: "https://t.me/kazan_futsal",
      instagram: "https://instagram.com/kazan_futsal",
    },
  },
  {
    leagueSlug: "nsk-amateur-football",
    contactName: "Новосибирская ЛЛ — секретариат",
    phone: "+7 (383) 210-33-44",
    email: "nll@nsk-sport.ru",
    address: "г. Новосибирск, ул. Спортивная, 8",
    social: {
      vk: "https://vk.com/nll_nsk",
      telegram: "https://t.me/nll_novosibirsk",
    },
  },
  {
    leagueSlug: "krasnodar-liga",
    contactName: "КЛЛ — Организаторы",
    phone: "+7 (861) 555-22-11",
    email: "kll@kuban-liga.ru",
    address: "г. Краснодар, ул. Красная, 44, СК «Кубань Арена Любительская»",
    social: {
      vk: "https://vk.com/kll_krasnodar",
      instagram: "https://instagram.com/kll_krasnodar",
    },
  },
  {
    leagueSlug: "rostov-street-football",
    contactName: "Стрит Футбол Ростов",
    phone: "+7 (863) 777-44-22",
    email: "street@rostov-sport.ru",
    address: "г. Ростов-на-Дону, пр. Ворошиловский, 10, Площадка «Стрит»",
    social: {
      vk: "https://vk.com/rostov_street",
      telegram: "https://t.me/rostov_street",
    },
  },
  {
    leagueSlug: "moscow-futsal-pro",
    contactName: "МФП — Дирекция",
    phone: "+7 (495) 888-11-22",
    email: "pro@msk-futsal.ru",
    address: "г. Москва, Ленинградский пр., 80, СК «Динамо»",
    social: {
      vk: "https://vk.com/msk_futsal_pro",
      telegram: "https://t.me/msk_futsal_pro",
      instagram: "https://instagram.com/msk_futsal_pro",
    },
  },
];

export function getContactsByLeague(leagueSlug: string): LeagueContacts | undefined {
  return contacts.find((c) => c.leagueSlug === leagueSlug);
}
