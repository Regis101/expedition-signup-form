-- Reorder columns so request fields come first; keep id and created_at at the end
DROP TABLE IF EXISTS public.signups;

CREATE TABLE public.signups (
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
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a signup"
  ON public.signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
