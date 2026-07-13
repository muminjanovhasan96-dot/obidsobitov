import { NextResponse } from "next/server";

/**
 * Admin login. Checks the password against the ADMIN_PASSWORD env var
 * (default "obidsobitov" — CHANGE IT in .env.local / Vercel env for production).
 * Keeps the password out of the client bundle.
 */
export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const expected = process.env.ADMIN_PASSWORD || "obidsobitov";
  if (password && password === expected) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
