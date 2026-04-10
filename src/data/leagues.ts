export interface League {
  id: string;
  slug: string;
  name: string;
  city: string;
  sport: string;
  description: string;
  coverImage: string;
  logoImage: string;
  color: string;
  foundedYear: number;
  teamsCount: number;
}

export const leagues: League[] = [
  {
    id: "1",
    slug: "moscow-premier-league",
    name: "Московская Премьер Лига",
    city: "Москва",
    sport: "Футбол",
    description: "Главная любительская футбольная лига Москвы. Соревнования проходят на лучших полях столицы с профессиональным судейством и статистикой.",
    coverImage: "https://placehold.co/1200x400/0a1628/e53935?text=Московская+Премьер+Лига",
    logoImage: "https://placehold.co/200x200/e53935/ffffff?text=МПЛ",
    color: "#0f4ac4",
    foundedYear: 2015,
    teamsCount: 16,
  },
  {
    id: "2",
    slug: "spb-football-league",
    name: "Санкт-Петербургская Футбольная Лига",
    city: "Санкт-Петербург",
    sport: "Футбол",
    description: "Крупнейшая любительская лига Северной столицы. Турниры по мини-футболу и футболу 8х8 для команд всех уровней.",
    coverImage: "https://placehold.co/1200x400/0d1e38/0f4ac4?text=СПб+Футбольная+Лига",
    logoImage: "https://placehold.co/200x200/0f4ac4/ffffff?text=СФЛ",
    color: "#0f4ac4",
    foundedYear: 2017,
    teamsCount: 24,
  },
  {
    id: "3",
    slug: "ekb-city-league",
    name: "Городская Лига Екатеринбурга",
    city: "Екатеринбург",
    sport: "Футбол",
    description: "Футбольная лига для любителей Екатеринбурга и области. Три дивизиона, прозрачная статистика и честная борьба за чемпионство.",
    coverImage: "https://placehold.co/1200x400/091525/e53935?text=Городская+Лига+ЕКБ",
    logoImage: "https://placehold.co/200x200/0a1f3d/ffffff?text=ГЛЕ",
    color: "#0a1f3d",
    foundedYear: 2018,
    teamsCount: 18,
  },
  {
    id: "4",
    slug: "kazan-futsal",
    name: "Казанская Лига Мини-Футбола",
    city: "Казань",
    sport: "Мини-футбол",
    description: "Мини-футбольная лига Казани с богатой историей. Еженедельные туры, кубковые матчи и финальные турниры в конце сезона.",
    coverImage: "https://placehold.co/1200x400/0e1e30/0f4ac4?text=Казань+Мини-Футбол",
    logoImage: "https://placehold.co/200x200/0f4ac4/e53935?text=КЛМ",
    color: "#0f4ac4",
    foundedYear: 2016,
    teamsCount: 12,
  },
  {
    id: "5",
    slug: "nsk-amateur-football",
    name: "Новосибирская Любительская Лига",
    city: "Новосибирск",
    sport: "Футбол",
    description: "Самая быстроразвивающаяся лига Сибири. Лиги для начинающих и опытных игроков, дружеская атмосфера и серьёзный подход к организации.",
    coverImage: "https://placehold.co/1200x400/081420/e53935?text=НЛЛ+Новосибирск",
    logoImage: "https://placehold.co/200x200/0d1e38/ffffff?text=НЛЛ",
    color: "#0d1e38",
    foundedYear: 2019,
    teamsCount: 14,
  },
  {
    id: "6",
    slug: "krasnodar-liga",
    name: "Краснодарская Любительская Лига",
    city: "Краснодар",
    sport: "Футбол",
    description: "Футбол под южным солнцем! Лига объединяет любителей футбола Краснодара и края. Сезон проходит круглый год на современных полях.",
    coverImage: "https://placehold.co/1200x400/0a1a10/e53935?text=КЛЛ+Краснодар",
    logoImage: "https://placehold.co/200x200/0d2518/ffffff?text=КЛЛ",
    color: "#0d2518",
    foundedYear: 2014,
    teamsCount: 20,
  },
  {
    id: "7",
    slug: "rostov-street-football",
    name: "Лига Ростова — Стрит Футбол",
    city: "Ростов-на-Дону",
    sport: "Стрит-футбол",
    description: "Уличный футбол в духе дворовых баталий. 3х3 и 5х5 форматы, открытые площадки, никаких правил кроме честной игры.",
    coverImage: "https://placehold.co/1200x400/181208/e53935?text=Ростов+Стрит",
    logoImage: "https://placehold.co/200x200/1a1000/ffffff?text=РСФ",
    color: "#1a1000",
    foundedYear: 2020,
    teamsCount: 8,
  },
  {
    id: "8",
    slug: "moscow-futsal-pro",
    name: "МСК Футзал Профи",
    city: "Москва",
    sport: "Мини-футбол",
    description: "Профессиональная любительская мини-футбольная лига Москвы. Для команд с амбициями, высоким темпом и опытными игроками.",
    coverImage: "https://placehold.co/1200x400/060c18/0f4ac4?text=МСК+Футзал+Профи",
    logoImage: "https://placehold.co/200x200/e53935/ffffff?text=МФП",
    color: "#0f4ac4",
    foundedYear: 2013,
    teamsCount: 10,
  },
];
