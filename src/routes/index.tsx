import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import {
  Compass,
  Map as MapIcon,
  Users,
  Backpack,
  WifiOff,
  MapPin,
  CalendarDays,
  Wallet,
  Check,
  Star,
  Mountain,
  Send,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar } from "@/components/landing/Navbar";
import { SignupForm } from "@/components/landing/SignupForm";
import { ROUTES } from "@/components/landing/routes-data";
import heroImg from "@/assets/hero-mountains.jpg";
import textureImg from "@/assets/texture-dark.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Дикие Тропы — Авторские походы по Кавказу, Алтаю, Карелии и Уралу" },
      {
        name: "description",
        content:
          "Авторские походы и экспедиции по России для любителей активного отдыха. Малые группы, опытные гиды, всё снаряжение включено.",
      },
      { property: "og:title", content: "Дикие Тропы — экспедиции по России" },
      {
        property: "og:description",
        content: "Кавказ, Алтай, Карелия, Урал. Малые группы. Авторские маршруты.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: LandingPage,
});

function pickRoute(routeTitle: string) {
  window.dispatchEvent(new CustomEvent("dt:pick-route", { detail: { route: routeTitle } }));
}

function LandingPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Toaster theme="dark" position="top-center" richColors />
      <Navbar />

      <Hero />
      <WhyUs />
      <Routes />
      <HowItWorks />
      <Reviews />
      <FAQ />
      <CtaBanner />
      <SignupSection />
      <Footer />
    </div>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <img
        src={heroImg}
        alt="Тёмные горы Кавказа на закате"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1280}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div className="absolute inset-0 grain" />

      <div className="container-x relative z-10 py-20 md:py-32">
        <div className="max-w-3xl animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-ochre" />
            <span className="text-eyebrow">Экспедиции по России — с 2014</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-bone">
            Настоящая Россия —
            <span className="block italic text-ochre/95">за горизонтом привычного</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg md:text-xl text-bone/80 leading-relaxed">
            Авторские походы по Кавказу, Алтаю, Карелии и Уралу для тех, кто устал от пляжей.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="ochre" size="xl" asChild>
              <a href="#routes">Смотреть маршруты</a>
            </Button>
            <Button variant="wire" size="xl" asChild>
              <a href="#about">Узнать о нас</a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-bone/75">
            <span className="flex items-center gap-2"><Mountain className="h-4 w-4 text-ochre" /> 4 маршрута</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4 text-ochre" fill="currentColor" /> 47 участников</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-ochre" /> 4 региона России</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-bone/50 animate-bounce">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}

/* -------------------- WHY US -------------------- */
function WhyUs() {
  const items = [
    { icon: MapIcon, title: "Авторские маршруты", text: "Каждый поход разработан гидом с опытом 10+ лет" },
    { icon: Users, title: "Малые группы", text: "Не более 10 человек, личный подход" },
    { icon: Backpack, title: "Всё включено", text: "Снаряжение, питание, трансфер, страховка" },
    { icon: WifiOff, title: "Цифровой детокс", text: "Маршруты в зонах без связи, только природа" },
  ];
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <div className="text-eyebrow mb-4">Почему мы</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-bone leading-tight">
            Не тур-пакет.
            <span className="block italic text-ochre">Настоящая экспедиция.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="group relative p-7 border border-border/70 bg-card/40 hover:bg-card/80 hover:border-ochre/40 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ochre/40 text-ochre mb-5 group-hover:border-ochre group-hover:bg-ochre/10 transition-colors">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl text-bone mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- ROUTES -------------------- */
function Routes() {
  return (
    <section id="routes" className="relative py-24 md:py-32 bg-card/30">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <div className="text-eyebrow mb-4">Маршруты</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-bone leading-tight">
            Четыре направления —
            <span className="block italic text-ochre">одна страна</span>
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {ROUTES.map((r) => (
            <article
              key={r.id}
              className="group flex flex-col bg-background/60 border border-border/70 hover:border-ochre/50 transition-all duration-500 overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={r.image}
                  alt={r.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-ochre text-ochre-foreground text-[10px] uppercase tracking-widest font-bold px-3 py-1.5">
                    {r.level}
                  </span>
                </div>
              </div>

              <div className="p-7 md:p-8 flex flex-col flex-1">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-bone leading-tight">
                  {r.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-ochre" /> {r.region}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-ochre" /> {r.duration}</span>
                </div>

                <p className="mt-5 text-sm text-bone/80 leading-relaxed">{r.description}</p>

                <div className="mt-6 grid gap-3 text-sm border-t border-border/60 pt-5">
                  <div className="flex gap-3">
                    <CalendarDays className="h-4 w-4 text-ochre shrink-0 mt-0.5" />
                    <div><span className="text-muted-foreground">Даты:</span> <span className="text-bone">{r.dates}</span></div>
                  </div>
                  <div className="flex gap-3">
                    <Wallet className="h-4 w-4 text-ochre shrink-0 mt-0.5" />
                    <div><span className="text-muted-foreground">Цена:</span> <span className="text-bone font-semibold">{r.price}</span></div>
                  </div>
                  <div className="flex gap-3">
                    <Check className="h-4 w-4 text-ochre shrink-0 mt-0.5" />
                    <div><span className="text-muted-foreground">Включено:</span> <span className="text-bone/90">{r.included}</span></div>
                  </div>
                </div>

                <Button
                  variant="ochre"
                  size="lg"
                  className="mt-7 w-full"
                  onClick={() => pickRoute(r.title)}
                >
                  Записаться на этот поход
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- HOW IT WORKS -------------------- */
function HowItWorks() {
  const steps = [
    "Выбираешь маршрут — смотришь детали, даты и цены",
    "Оставляешь заявку — заполняешь форму за 2 минуты",
    "Получаешь подтверждение — мы связываемся в течение 24 часов",
    "Собираешь рюкзак — список снаряжения пришлём на почту",
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <div className="text-eyebrow mb-4">Как это работает</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-bone leading-tight">
            От заявки до вершины —
            <span className="block italic text-ochre">4 шага</span>
          </h2>
        </div>

        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
          {steps.map((s, i) => (
            <li key={i} className="relative pl-2">
              <div className="font-display text-7xl md:text-8xl font-bold text-ochre/25 leading-none mb-4">
                0{i + 1}
              </div>
              <p className="text-bone/85 leading-relaxed text-base max-w-xs">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------- REVIEWS -------------------- */
function Reviews() {
  const data = [
    {
      name: "Марина К.",
      city: "Москва",
      text: "Поход на Кавказ стал лучшим опытом за последние годы. Гид Алексей — профессионал высшего уровня, группа подобралась душевная. Уже записалась на Алтай!",
    },
    {
      name: "Дмитрий Л.",
      city: "Екатеринбург",
      text: "Ходили на Иремель с женой. Организация на 10/10 — всё было вовремя, еда отличная, маршрут продуман до мелочей. Рекомендую всем, кто хочет попробовать горы.",
    },
    {
      name: "Ольга В.",
      city: "Санкт-Петербург",
      text: "Карелия превзошла все ожидания. Острова Ладоги — это другой мир. Спасибо команде за незабываемые 4 дня без телефона и суеты!",
    },
  ];
  return (
    <section id="reviews" className="relative py-24 md:py-32 bg-card/30">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <div className="text-eyebrow mb-4">Отзывы</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-bone leading-tight">
            Говорят те,
            <span className="block italic text-ochre">кто уже был</span>
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {data.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col gap-5 p-8 border border-border/70 bg-background/50 hover:border-ochre/40 transition-colors"
            >
              <div className="flex gap-1 text-ochre">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" />
                ))}
              </div>
              <blockquote className="text-bone/85 leading-relaxed text-[15px]">
                «{r.text}»
              </blockquote>
              <figcaption className="mt-auto pt-4 border-t border-border/60">
                <div className="font-display text-lg text-bone">{r.name}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{r.city}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */
function FAQ() {
  const items = [
    {
      q: "Нужна ли физическая подготовка?",
      a: "Наши маршруты рассчитаны на любителей без специальной подготовки. Рекомендуем регулярные прогулки и отсутствие серьёзных проблем со здоровьем.",
    },
    {
      q: "Что входит в стоимость?",
      a: "Гид, питание (3 раза в день), трансфер от ближайшего города, групповое снаряжение (палатки, горелки, посуда), страховка.",
    },
    {
      q: "Что брать с собой?",
      a: "После записи мы пришлём подробный список. В среднем: трекинговые ботинки, термобельё, дождевик, личная аптечка.",
    },
    {
      q: "Можно ли записаться вдвоём / группой?",
      a: "Да, можно. Укажите в комментарии количество участников и мы согласуем детали.",
    },
    {
      q: "Как происходит отмена?",
      a: "Полный возврат за 14+ дней до старта, 50% за 7–13 дней.",
    },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x max-w-3xl">
        <div className="mb-12 text-center">
          <div className="text-eyebrow mb-4">FAQ</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-bone">
            Остались <span className="italic text-ochre">вопросы?</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((it, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border/70 bg-card/40 px-5 rounded-sm data-[state=open]:border-ochre/40"
            >
              <AccordionTrigger className="text-left font-display text-lg md:text-xl text-bone hover:text-ochre hover:no-underline py-5">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-bone/80 text-base leading-relaxed pb-5">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* -------------------- CTA BANNER -------------------- */
function CtaBanner() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <img
        src={textureImg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background" />
      <div className="absolute inset-0 grain" />
      <div className="container-x relative z-10 text-center">
        <div className="inline-flex items-center gap-2 mb-5 text-ochre">
          <Compass className="h-5 w-5" />
          <span className="text-eyebrow">Готов к выходу</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-bone leading-tight max-w-3xl mx-auto">
          Готов к своей <span className="italic text-ochre">первой экспедиции?</span>
        </h2>
        <p className="mt-6 text-lg text-bone/75 max-w-xl mx-auto">
          Места в группах ограничены — не более 10 человек
        </p>
        <div className="mt-10">
          <Button variant="ochre" size="xl" asChild>
            <a href="#signup">Записаться сейчас</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* -------------------- SIGNUP -------------------- */
function SignupSection() {
  return (
    <section id="signup" className="relative py-24 md:py-32 scroll-mt-20">
      <div className="container-x max-w-3xl">
        <div className="mb-12 text-center">
          <div className="text-eyebrow mb-4">Запись</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-bone">
            Запись на <span className="italic text-ochre">поход</span>
          </h2>
          <p className="mt-5 text-bone/75 text-base md:text-lg max-w-xl mx-auto">
            Заполни форму — мы свяжемся с тобой в течение 24 часов
          </p>
        </div>
        <SignupForm />
      </div>
    </section>
  );
}

/* -------------------- FOOTER -------------------- */
function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background py-16">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ochre/60 text-ochre">
                <Compass className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-bone">ДИКИЕ ТРОПЫ</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic font-display text-lg">
              Россия ближе, чем кажется
            </p>
          </div>

          <div>
            <h4 className="text-eyebrow mb-4">Маршруты</h4>
            <ul className="space-y-2 text-sm text-bone/75">
              {ROUTES.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => pickRoute(r.title)}
                    className="hover:text-ochre transition-colors text-left"
                  >
                    {r.region}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-eyebrow mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-bone/75">
              <li><a href="#about" className="hover:text-ochre transition-colors">О нас</a></li>
              <li><a href="#signup" className="hover:text-ochre transition-colors">Контакты</a></li>
              <li><a href="#" className="hover:text-ochre transition-colors">Политика конфиденциальности</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-eyebrow mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-bone/75">
              <li><a href="tel:+74951234567" className="hover:text-ochre transition-colors">+7 (495) 123-45-67</a></li>
              <li><a href="mailto:hello@dikietropy.ru" className="hover:text-ochre transition-colors">hello@dikietropy.ru</a></li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="VK" className="flex h-10 w-10 items-center justify-center border border-border hover:border-ochre hover:text-ochre transition-colors text-bone/80">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12.785 16.241s.288-.032.435-.193c.135-.148.131-.426.131-.426s-.018-1.288.578-1.479c.587-.187 1.341 1.246 2.141 1.798.605.418 1.064.327 1.064.327l2.139-.03s1.119-.069.588-.952c-.043-.072-.308-.653-1.594-1.853-1.346-1.256-1.165-1.053.456-3.225.987-1.323 1.382-2.131 1.258-2.477-.117-.331-.85-.244-.85-.244l-2.406.015s-.179-.025-.31.054c-.13.078-.213.258-.213.258s-.382 1.03-.892 1.907c-1.075 1.85-1.504 1.948-1.681 1.835-.412-.265-.309-1.066-.309-1.636 0-1.781.27-2.521-.524-2.715-.264-.064-.458-.106-1.13-.113-.864-.009-1.594.003-2.008.207-.275.135-.487.435-.358.452.16.022.523.099.715.36.249.337.24.094.24 2.196 0 .345-.062 1.532-.451 1.84-.267.21-.633-.219-1.591-1.866-.491-.843-.861-1.776-.861-1.776s-.071-.174-.198-.267c-.155-.114-.371-.149-.371-.149l-2.286.015s-.343.01-.469.158c-.112.132-.009.405-.009.405s1.79 4.184 3.817 6.293c1.858 1.932 3.968 1.805 3.968 1.805h.956z"/></svg>
              </a>
              <a href="#" aria-label="Telegram" className="flex h-10 w-10 items-center justify-center border border-border hover:border-ochre hover:text-ochre transition-colors text-bone/80">
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 text-xs text-muted-foreground flex justify-between flex-wrap gap-3">
          <span>© 2026 Дикие Тропы</span>
          <span>Made for those who walk further</span>
        </div>
      </div>
    </footer>
  );
}
