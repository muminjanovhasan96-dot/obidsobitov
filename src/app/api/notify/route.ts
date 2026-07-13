import { NextResponse } from "next/server";

/**
 * ------------------------------------------------------------------
 *  ORDER / LEAD NOTIFICATIONS → TELEGRAM
 * ------------------------------------------------------------------
 *  Concierge requests, checkout orders and newsletter sign-ups POST here.
 *  When the two environment variables below are set, the message is sent to
 *  the boutique's Telegram chat via the Bot API. If they are NOT set, the
 *  route responds { ok: false } and the form falls back to opening a
 *  pre-filled Telegram deep-link so nothing is ever lost.
 *
 *  HOW TO ENABLE (one-time):
 *   1. In Telegram, message @BotFather → /newbot → copy the bot TOKEN.
 *   2. Add the bot to the boutique's group/channel (or message it directly),
 *      then get the chat id (e.g. via @userinfobot or the getUpdates API).
 *   3. Set env vars (locally in .env.local, on Vercel in Project Settings):
 *        TELEGRAM_BOT_TOKEN=123456:ABC...
 *        TELEGRAM_CHAT_ID=123456789
 *   That's it — submissions now arrive in Telegram automatically.
 */
export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  let payload: { type?: string; message?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const text = (payload.message ?? "").toString().slice(0, 3500);
  if (!text) {
    return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
  }

  // Not configured yet — tell the client to use the Telegram deep-link fallback.
  if (!token || !chatId) {
    return NextResponse.json({ ok: false, configured: false });
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: `🕊️ OBID SOBITOV — ${payload.type ?? "lead"}\n\n${text}`,
          disable_web_page_preview: true,
        }),
      },
    );
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "telegram_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
