## 1. Страницы-заглушки

- [x] 1.1 Создать `src/app/news/page.tsx` — заглушка "Новости скоро появятся"
- [x] 1.2 Создать `src/app/shop/page.tsx` — заглушка "Магазин скоро появится"

## 2. BottomNav компонент

- [x] 2.1 Создать `src/components/BottomNav.tsx` (`"use client"`)
- [x] 2.2 Добавить 5 табов: Главная (`/`), Лиги (`/leagues`), Новости (`/news`), Магазин (`/shop`), Профиль (`/auth/login` или `/profile`)
- [x] 2.3 Использовать `usePathname()` для определения активного таба
- [x] 2.4 Активный таб: иконка и лейбл в `var(--color-brand-accent)`, точка-индикатор сверху с `scale`/`opacity` анимацией
- [x] 2.5 Кнопки: `active:scale-90 transition-transform duration-150` для press-анимации
- [x] 2.6 Фон: `bg-[var(--color-brand-dark)]/95 backdrop-blur-md`, `border-t border-[var(--color-border-light)]`
- [x] 2.7 Добавить `style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}` для notch-устройств
- [x] 2.8 Скрыть на десктопе: `md:hidden`

## 3. Layout и Navbar

- [x] 3.1 Прочитать `src/app/layout.tsx` и добавить `<BottomNav />` перед закрывающим `</body>`, добавить `pb-16 md:pb-0` на `<main>`
- [x] 3.2 Прочитать `src/components/Navbar.tsx` и скрыть бургер-кнопку на мобильных (`hidden md:hidden` → убрать кнопку из мобильного вида, оставив только desktop nav)

## 4. QA

- [ ] 4.1 На мобильном (<768px) таббар виден, бургер скрыт
- [ ] 4.2 Активный таб подсвечивается при переходе между страницами
- [ ] 4.3 Контент не перекрывается таббаром при скролле вниз
- [x] 4.4 `npm run build` — без ошибок
