/**
 * Best-effort lead/order notification to the boutique's Telegram (via
 * /api/notify). Returns true if the server delivered it. When the Telegram
 * bot isn't configured yet it returns false, and callers fall back to the
 * Telegram deep-link so nothing is lost. Never throws.
 */
export async function notifyLead(
  type: string,
  message: string,
): Promise<boolean> {
  try {
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, message }),
    });
    const data = (await res.json()) as { ok?: boolean };
    return Boolean(data?.ok);
  } catch {
    return false;
  }
}
