
-- Recreate signups with Russian column names in the requested order
DROP TABLE IF EXISTS public.signups;

CREATE TABLE public.signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "Фамилия" text NOT NULL,
  "Имя" text NOT NULL,
  "Отчество" text,
  "Возраст" integer NOT NULL,
  "Номер телефона" text NOT NULL,
  "Почта" text NOT NULL,
  "Город проживания" text NOT NULL,
  "Название маршрута" text NOT NULL,
  "Дата начала" date NOT NULL,
  "Дата конца" date NOT NULL,
  "Комментарии" text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT signups_age_check CHECK ("Возраст" BETWEEN 14 AND 99),
  CONSTRAINT signups_dates_check CHECK ("Дата конца" > "Дата начала")
);

ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a signup"
ON public.signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
