// All editable content lives here — change venues, wishlist items, photos, etc.

export const EVENT = {
  name: "Нурик",
  birthday: "23 июля",
  banquetDate: new Date("2026-07-24T18:30:00+05:00"),
  dresscode: "Smart Casual",

  venues: [
    {
      id: "trieste",
      name: "Trieste",
      role: "Ужин · Банкет",
      time: "19:00",
      until: "22:00",
      address: "ул. Шевченко, 29, 1 этаж, Медеуский район",
      mapsUrl: "https://go.2gis.com/sD4j8",
      emoji: "🍽️",
    },
    {
      id: "point44",
      name: "Point 44",
      role: "Afterparty",
      time: "22:00",
      until: null, // open end
      address: "ул. Курмангазы, 44",
      mapsUrl: "https://go.2gis.com/DWBzp",
      emoji: "🎶",
    },
    // Третье место (бар рядом с Point44) — добавить сюда когда определится:
    // {
    //   id: "bar",
    //   name: "Название бара",
    //   role: "После клуба",
    //   time: "00:00",
    //   until: null,
    //   address: "...",
    //   mapsUrl: "https://go.2gis.com/...",
    //   emoji: "🍸",
    // },
  ],
};

// Wishlist items — После редактирования запустить: npx tsx scripts/seed-wishlist.ts
export const WISHLIST_ITEMS = [
  {
    id: "w1",
    title: "Кухонные весы (черный матовый)",
    description: "Электронные кухонные весы с точностью 0.1г, подсветкой и компактным дизайном.",
    link: "https://ozon.kz/t/gTVhrpg",
  },
  {
    id: "w2",
    title: "Книга «Лучший год в истории кино»",
    description: "Брайан Рафтери о том, почему 1999-й изменил кинематограф навсегда. Нон-фикшн.",
    link: "https://ozon.kz/t/VaXlKgv",
  },
  {
    id: "w3",
    title: "Подставка под монитор Satechi с USB hub",
    description: "Алюминиевая подставка для iMac со встроенным 6-портовым USB hub (USB-C, 3×USB-A, SD/microSD, аудио).",
    link: "https://ozon.kz/t/GciLzAS",
  },
  {
    id: "w4",
    title: "Подставка-хаб Satechi для iPad Pro",
    description: "Алюминиевая подставка + 6-портовый USB-C hub для iPad Pro, Space Gray.",
    link: "https://ozon.kz/t/8q5EAK5",
  },
  {
    id: "w7",
    title: "Кофейные весы Timemore Black Mirror Basic 3",
    description: "Умные весы для кофе с двумя таймерами (пуровер и эспрессо), точность 0.1г, встроенный аккумулятор.",
    link: "https://l.kaspi.kz/shop/67SFdiH41eu8WEP",
  },
  {
    id: "w8",
    title: "Ортопедическая подушка Askona Men Only",
    description: "Подушка 38×60 см с пеной с памятью формы, гипоаллергенная, для правильного положения шеи.",
    link: "https://l.kaspi.kz/shop/BkMxdmPdJapEvRU",
  },
  {
    id: "w9",
    title: "Кабель Apple USB-C → MagSafe 3 (2 м)",
    description: "Оригинальный Apple кабель 2м для зарядки MacBook Pro / MacBook Air с MagSafe 3.",
    link: "https://ozon.kz/t/rlPpNyB",
  },
  {
    id: "w10",
    title: "Зарядное устройство Anker 140 Вт (4 порта, GaN)",
    description: "4-портовая зарядка (2×USB-C + 2×USB-A) суммарно 140 Вт на чипе GaN, с цветным дисплеем и контролем температуры ActiveShield 2.0.",
    link: "https://l.kaspi.kz/shop/4ac18GGiiAQcEJG",
  },
  {
    id: "w11",
    title: "Peak Design Tech Pouch V2.0 Ocean",
    description: "Премиальный органайзер для кабелей и гаджетов из прочного нейлона, с множеством отсеков и молнией, открывающейся на всю ширину.",
    link: "https://ozon.kz/product/vkladysh-chehol-peak-design-tech-pouch-v2-0-ocean-btp-ds-3-3405390465/",
  },
  {
    id: "w12",
    title: "Hario Switch 360ml",
    description: "Иммерсионный дриппер Hario Switch — можно заваривать как пуровер и как полное погружение, 360мл. Идеально для любителей кофе.",
    link: "https://icoffee.store/products/hario-switch-360ml",
  },
  {
    id: "w13",
    title: "Orbitkey Foldable Tote Bag — Star Wars: Bounty Hunters",
    description: "Складная сумка-тоут Orbitkey в чёрном цвете с темой «Охотники за головами» из Star Wars. Рейтинг 4.8/5.",
    link: "https://ozon.kz/product/sumka-orbitkey-foldable-tote-bag-star-wars-bounty-hunters-chernyy-1800265780/",
  },
  {
    id: "w14",
    title: "Orbitkey Desk Mat XXL — чёрный",
    description: "Огромный настольный коврик для мыши и рабочего стола, водоотталкивающая поверхность, прошитые края, толщина 4.9мм.",
    link: "https://ozon.kz/product/orbitkey-kovrik-dlya-myshki-xxl-chernyy-3252211298/",
  },
  {
    id: "w15",
    title: "Термокружка Fellow Carter 0.475 л (синий)",
    description: "Вакуумная кружка с керамическим покрытием внутри: держит тепло до 12ч, холод до 24ч. Три сменные крышки в комплекте.",
    link: "https://kaspi.kz/shop/p/termokruzhka-fellow-carter-0-475-l-sinii-138267428/",
  },
];

// Photos for gallery — Нурик кладёт реальные фото в /public/photos/
// Формат: { src: '/photos/filename.jpg', alt: 'описание' }
export const GALLERY_PHOTOS: { src: string; alt: string }[] = [
  // Пока пусто — добавить фото сюда и в /public/photos/
  // { src: '/photos/photo1.jpg', alt: 'Описание фото' },
];
