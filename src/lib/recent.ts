const KEY = "obid-recent";
const MAX = 10;

/** Record a product id as recently viewed (most-recent first, de-duplicated). */
export function trackView(id: string): void {
  try {
    const prev = getRecentIds();
    const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function getRecentIds(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}
