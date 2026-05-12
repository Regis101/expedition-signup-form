import { useEffect, useId, useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ROUTE_TITLES, ROUTES } from "./routes-data";
import { submitSignup } from "@/lib/signup.functions";

const formSchema = z.object({
  lastName: z.string().trim().min(1, "Укажите фамилию").max(80),
  firstName: z.string().trim().min(1, "Укажите имя").max(80),
  middleName: z.string().trim().max(80).optional(),
  age: z
    .string()
    .regex(/^\d+$/, "Только цифры")
    .refine((v) => Number(v) >= 14 && Number(v) <= 99, "Возраст 14–99"),
  phone: z
    .string()
    .trim()
    .regex(/^\+7\d{10}$/, "Формат: +7XXXXXXXXXX"),
  email: z.string().trim().email("Некорректный e-mail").max(160),
  city: z.string().trim().min(1, "Укажите город").max(120),
  route: z.string().min(1, "Выберите маршрут"),
  startDate: z.string().min(1, "Укажите дату начала"),
  endDate: z.string().min(1, "Укажите дату окончания"),
  comments: z.string().trim().max(1000).optional(),
});

type FormValues = z.infer<typeof formSchema>;
type Errors = Partial<Record<keyof FormValues, string>>;

const initial: FormValues = {
  lastName: "",
  firstName: "",
  middleName: "",
  age: "",
  phone: "+7",
  email: "",
  city: "",
  route: "",
  startDate: "",
  endDate: "",
  comments: "",
};

function toRu(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function SignupForm() {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useServerFn(submitSignup);
  const ids = {
    lastName: useId(),
    firstName: useId(),
    middleName: useId(),
    age: useId(),
    phone: useId(),
    email: useId(),
    city: useId(),
    route: useId(),
    startDate: useId(),
    endDate: useId(),
    comments: useId(),
  };

  useEffect(() => {
    function onPick(e: Event) {
      const detail = (e as CustomEvent<{ route: string }>).detail;
      setValues((v) => ({ ...v, route: detail.route }));
      setTimeout(() => {
        document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
    window.addEventListener("dt:pick-route", onPick as EventListener);
    return () => window.removeEventListener("dt:pick-route", onPick as EventListener);
  }, []);

  // Auto-compute end date from chosen route duration + start date
  useEffect(() => {
    if (!values.startDate || !values.route) return;
    const route = ROUTES.find((r) => r.title === values.route);
    if (!route) return;
    const start = new Date(values.startDate + "T00:00:00");
    if (Number.isNaN(start.getTime())) return;
    const end = new Date(start);
    end.setDate(start.getDate() + route.durationDays - 1);
    const iso = end.toISOString().slice(0, 10);
    setValues((v) => (v.endDate === iso ? v : { ...v, endDate: iso }));
    setErrors((e) => (e.endDate ? { ...e, endDate: undefined } : e));
  }, [values.startDate, values.route]);

  function update<K extends keyof FormValues>(key: K, val: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!errs[k]) errs[k] = issue.message;
      }
      // Date order check
      if (values.startDate && values.endDate && values.endDate <= values.startDate) {
        errs.endDate = "Должна быть позже даты начала";
      }
      setErrors(errs);
      toast.error("Проверьте поля формы");
      return;
    }
    if (parsed.data.endDate <= parsed.data.startDate) {
      setErrors({ endDate: "Должна быть позже даты начала" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await submit({
        data: {
          lastName: parsed.data.lastName,
          firstName: parsed.data.firstName,
          middleName: parsed.data.middleName ?? "",
          age: Number(parsed.data.age),
          phone: parsed.data.phone,
          email: parsed.data.email,
          city: parsed.data.city,
          route: parsed.data.route,
          startDate: toRu(parsed.data.startDate),
          endDate: toRu(parsed.data.endDate),
          comments: parsed.data.comments ?? "",
        },
      });
      if (res.ok) {
        setSuccess(true);
        setValues(initial);
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Не удалось отправить заявку. Попробуйте позже.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldCls =
    "bg-background/40 border-border/80 text-bone placeholder:text-muted-foreground/60 h-12";
  const errCls = "text-xs text-destructive mt-1";

  return (
    <>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className="grid gap-5 md:grid-cols-2 bg-card/60 border border-border/60 backdrop-blur-sm p-6 md:p-10 rounded-sm shadow-2xl"
      >
        <div>
          <Label htmlFor={ids.lastName} className="text-bone/90 mb-2 block">Фамилия *</Label>
          <Input id={ids.lastName} value={values.lastName} onChange={(e) => update("lastName", e.target.value)} className={fieldCls} autoComplete="family-name" />
          {errors.lastName && <p className={errCls}>{errors.lastName}</p>}
        </div>
        <div>
          <Label htmlFor={ids.firstName} className="text-bone/90 mb-2 block">Имя *</Label>
          <Input id={ids.firstName} value={values.firstName} onChange={(e) => update("firstName", e.target.value)} className={fieldCls} autoComplete="given-name" />
          {errors.firstName && <p className={errCls}>{errors.firstName}</p>}
        </div>
        <div>
          <Label htmlFor={ids.middleName} className="text-bone/90 mb-2 block">Отчество</Label>
          <Input id={ids.middleName} value={values.middleName} onChange={(e) => update("middleName", e.target.value)} className={fieldCls} autoComplete="additional-name" />
        </div>
        <div>
          <Label htmlFor={ids.age} className="text-bone/90 mb-2 block">Возраст *</Label>
          <Input id={ids.age} inputMode="numeric" pattern="\d*" value={values.age} onChange={(e) => update("age", e.target.value.replace(/\D/g, ""))} className={fieldCls} />
          {errors.age && <p className={errCls}>{errors.age}</p>}
        </div>
        <div>
          <Label htmlFor={ids.phone} className="text-bone/90 mb-2 block">Номер телефона *</Label>
          <Input id={ids.phone} type="tel" value={values.phone} onChange={(e) => {
            let v = e.target.value.replace(/[^\d+]/g, "");
            if (!v.startsWith("+7")) v = "+7" + v.replace(/^\+?7?/, "");
            update("phone", v.slice(0, 12));
          }} className={fieldCls} placeholder="+7XXXXXXXXXX" autoComplete="tel" />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>
        <div>
          <Label htmlFor={ids.email} className="text-bone/90 mb-2 block">Почта *</Label>
          <Input id={ids.email} type="email" value={values.email} onChange={(e) => update("email", e.target.value)} className={fieldCls} autoComplete="email" />
          {errors.email && <p className={errCls}>{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor={ids.city} className="text-bone/90 mb-2 block">Город проживания *</Label>
          <Input id={ids.city} value={values.city} onChange={(e) => update("city", e.target.value)} className={fieldCls} autoComplete="address-level2" />
          {errors.city && <p className={errCls}>{errors.city}</p>}
        </div>
        <div>
          <Label htmlFor={ids.route} className="text-bone/90 mb-2 block">Название маршрута *</Label>
          <Select value={values.route} onValueChange={(v) => update("route", v)}>
            <SelectTrigger id={ids.route} className={fieldCls + " w-full"}>
              <SelectValue placeholder="Выберите маршрут" />
            </SelectTrigger>
            <SelectContent>
              {ROUTE_TITLES.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.route && <p className={errCls}>{errors.route}</p>}
        </div>
        <div>
          <Label htmlFor={ids.startDate} className="text-bone/90 mb-2 block">Дата начала *</Label>
          <Input id={ids.startDate} type="date" value={values.startDate} onChange={(e) => update("startDate", e.target.value)} className={fieldCls + " [color-scheme:dark]"} />
          {errors.startDate && <p className={errCls}>{errors.startDate}</p>}
        </div>
        <div>
          <Label htmlFor={ids.endDate} className="text-bone/90 mb-2 block">Дата конца *</Label>
          <Input id={ids.endDate} type="date" value={values.endDate} readOnly tabIndex={-1} className={fieldCls + " [color-scheme:dark] cursor-not-allowed opacity-80"} />
          <p className="mt-1 text-[11px] text-muted-foreground">Рассчитывается автоматически по длительности маршрута</p>
          {errors.endDate && <p className={errCls}>{errors.endDate}</p>}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor={ids.comments} className="text-bone/90 mb-2 block">Комментарии</Label>
          <Textarea id={ids.comments} value={values.comments} onChange={(e) => update("comments", e.target.value)} placeholder="Количество участников, пожелания, вопросы…" rows={4} className="bg-background/40 border-border/80 text-bone placeholder:text-muted-foreground/60" />
        </div>
        <div className="md:col-span-2 mt-2">
          <Button type="submit" variant="ochre" size="xl" disabled={submitting} className="w-full">
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Отправляем…</> : "Отправить заявку"}
          </Button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </p>
        </div>
      </form>

      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="bg-card border-ochre/40">
          <DialogHeader>
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-ochre/15 text-ochre">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <DialogTitle className="text-center font-display text-2xl text-bone">
              Заявка принята!
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground pt-2">
              Мы свяжемся с вами в течение 24 часов. Ждём вас на маршруте!
            </DialogDescription>
          </DialogHeader>
          <Button variant="ochre" size="lg" onClick={() => setSuccess(false)} className="mt-2">
            Отлично
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
