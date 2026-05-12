import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Compass, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#routes", label: "Маршруты" },
  { href: "#about", label: "О нас" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#signup", label: "Записаться" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/60 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.6)]"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ochre/60 text-ochre group-hover:rotate-45 transition-transform duration-500">
            <Compass className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg md:text-xl font-bold tracking-wider text-bone">
              ДИКИЕ&nbsp;ТРОПЫ
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
              экспедиции по России
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm uppercase tracking-wider text-bone/80 hover:text-ochre transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="ochre" size="lg" asChild>
            <a href="#routes">Выбрать поход</a>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-bone p-2"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <div className="container-x py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base uppercase tracking-wider text-bone/90 py-2 border-b border-border/40"
              >
                {l.label}
              </a>
            ))}
            <Button variant="ochre" size="lg" asChild className="mt-2">
              <a href="#routes" onClick={() => setOpen(false)}>Выбрать поход</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
