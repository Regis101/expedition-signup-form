export type Route = {
  id: string;
  title: string;
  region: string;
  duration: string;
  durationDays: number;
  description: string;
  dates: string;
  price: string;
  included: string;
  image: string;
  level: string;
};

import caucasus from "@/assets/route-caucasus.jpg";
import altai from "@/assets/route-altai.jpg";
import karelia from "@/assets/route-karelia.jpg";
import ural from "@/assets/route-ural.jpg";

export const ROUTES: Route[] = [
  {
    id: "caucasus",
    title: "Вершины Кавказа: Домбай — Архыз",
    region: "Карачаево-Черкесия",
    duration: "5 дней / 4 ночи",
    durationDays: 5,
    description:
      "Переход через альпийские луга с видом на Главный Кавказский хребет. Ночёвки в горных приютах и палатках на высоте 2400 м. Идеально для тех, кто хочет первый настоящий горный опыт без технического альпинизма.",
    dates: "июнь–август, старт каждые 2 недели",
    price: "от 28 000 ₽ / чел",
    included: "гид, питание (3 раза в день), трансфер от Черкесска, страховка, снаряжение для лагеря",
    image: caucasus,
    level: "Для любителей",
  },
  {
    id: "altai",
    title: "Алтайская тайга: Телецкое озеро — водопады Чульчи",
    region: "Республика Алтай",
    duration: "4 дня / 3 ночи",
    durationDays: 4,
    description:
      "Пеший маршрут вдоль берега Телецкого озера к самому высокому водопаду Сибири — Учар (160 м). Смешанный рельеф: лес, скалы, переправы по бродам. Погружение в дикую природу Сибири.",
    dates: "июль–сентябрь, старт каждые 3 недели",
    price: "от 24 000 ₽ / чел",
    included: "гид, питание, трансфер от Горно-Алтайска, страховка, аренда треккинговых палок",
    image: altai,
    level: "Для любителей",
  },
  {
    id: "karelia",
    title: "Карельские озёра: острова Ладоги",
    region: "Республика Карелия",
    duration: "4 дня / 3 ночи",
    durationDays: 4,
    description:
      "Байдарочный и пеший поход по шхерам Ладожского озера. Ночёвки на необитаемых островах, рыбалка, закаты над водой. Маршрут без серьёзных физических нагрузок — подходит для начинающих.",
    dates: "июнь–август, старт еженедельно",
    price: "от 19 000 ₽ / чел",
    included: "гид, байдарки и вёсла, питание, трансфер от Сортавалы, страховка",
    image: karelia,
    level: "Для любителей",
  },
  {
    id: "ural",
    title: "Каменный пояс: плато Иремель — Зюраткуль",
    region: "Южный Урал, Челябинская область",
    duration: "3 дня / 2 ночи",
    durationDays: 3,
    description:
      "Восхождение на второй по высоте пик Урала — гору Иремель (1582 м) с последующим переходом к озеру Зюраткуль. Маршрут проходит через курумники, субальпийские луга и горную тундру.",
    dates: "май–октябрь, старт каждые 2 недели",
    price: "от 15 000 ₽ / чел",
    included: "гид, питание, трансфер от Уфы, страховка",
    image: ural,
    level: "Для любителей",
  },
];

export const ROUTE_TITLES = ROUTES.map((r) => r.title);
