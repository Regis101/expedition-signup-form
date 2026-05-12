import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const signupSchema = z.object({
  lastName: z.string().trim().min(1).max(80),
  firstName: z.string().trim().min(1).max(80),
  middleName: z.string().trim().max(80).optional().default(""),
  age: z.number().int().min(14).max(99),
  phone: z.string().trim().regex(/^\+7\d{10}$/),
  email: z.string().trim().email().max(160),
  city: z.string().trim().min(1).max(120),
  route: z.string().trim().min(1).max(200),
  startDate: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/),
  endDate: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/),
  comments: z.string().trim().max(1000).optional().default(""),
});

const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

function nowMoscow(): string {
  const d = new Date();
  const fmt = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return fmt.format(d).replace(",", "");
}

export const submitSignup = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => signupSchema.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
    const SPREADSHEET_ID = process.env.SHEETS_SPREADSHEET_ID;
    const SHEET_NAME = process.env.SHEETS_SHEET_NAME || "Лист1";

    if (!LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) {
      console.error("Missing connector credentials");
      return { ok: false as const, error: "Сервис временно недоступен. Попробуйте позже." };
    }
    if (!SPREADSHEET_ID) {
      console.error("SHEETS_SPREADSHEET_ID is not configured");
      return { ok: false as const, error: "Таблица записей не настроена. Свяжитесь с администратором." };
    }

    const row = [
      data.lastName,
      data.firstName,
      data.middleName ?? "",
      String(data.age),
      data.phone,
      data.email,
      data.city,
      data.route,
      data.startDate,
      data.endDate,
      data.comments ?? "",
      nowMoscow(),
    ];

    const range = `${SHEET_NAME}!A:L`;
    const url = `${GATEWAY}/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Sheets append failed [${res.status}]: ${body}`);
      let hint = "Не удалось сохранить заявку.";
      if (res.status === 403) {
        hint =
          "Нет доступа к таблице (403). Откройте указанную Google‑таблицу и предоставьте подключённому Google‑аккаунту права редактора, либо измените SHEETS_SPREADSHEET_ID на свою таблицу.";
      } else if (res.status === 404) {
        hint = "Таблица не найдена (404). Проверьте SHEETS_SPREADSHEET_ID — это ID из URL между /d/ и /edit.";
      } else if (res.status === 400) {
        hint = `Ошибка диапазона/листа (400). Проверьте имя листа SHEETS_SHEET_NAME (по умолчанию «Лист1»). Ответ: ${body.slice(0, 200)}`;
      }
      return { ok: false as const, error: `${hint} [HTTP ${res.status}]` };
    }

    return { ok: true as const };
  });
