"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui/Button";
import { telegramLink } from "@/config/site";
import { notifyLead } from "@/lib/notify";

type FormState = {
  name: string;
  contact: string;
  item: string;
  budget: string;
  notes: string;
};

const EMPTY: FormState = {
  name: "",
  contact: "",
  item: "",
  budget: "",
  notes: "",
};

/** Shared field styling. */
const fieldBase =
  "w-full border border-line bg-surface/40 px-4 py-3.5 text-[14px] text-ink placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none";

export function ConciergeForm() {
  const { t } = useLocale();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Build a Telegram message from the current form values.
  function buildTelegramMessage(state: FormState) {
    return t("concierge.form.telegramMessage", {
      name: state.name || "—",
      contact: state.contact || "—",
      item: state.item || "—",
      budget: state.budget || "—",
      notes: state.notes || "—",
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Best-effort delivery to the boutique's Telegram (via /api/notify). If the
    // bot isn't configured, this silently no-ops and the success screen still
    // offers the Telegram deep-link fallback.
    void notifyLead("Concierge", buildTelegramMessage(form));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center border border-line bg-surface/40 px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
          <Check size={26} strokeWidth={1.5} />
        </span>
        <h3 className="mt-6 font-serif text-2xl text-ink">
          {t("concierge.form.success.title")}
        </h3>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted">
          {t("concierge.form.success.text")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            href={telegramLink(buildTelegramMessage(form))}
            external
            variant="gold-solid"
          >
            <Send size={15} />
            {t("concierge.form.sendTelegram")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setForm(EMPTY);
              setSubmitted(false);
            }}
          >
            {t("concierge.form.success.another")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-surface/40 p-6 md:p-10"
    >
      <h3 className="font-serif text-2xl text-ink">
        {t("concierge.form.title")}
      </h3>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-label text-muted">
            {t("concierge.form.name")}
          </span>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t("concierge.form.namePlaceholder")}
            className={fieldBase}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-label text-muted">
            {t("concierge.form.contact")}
          </span>
          <input
            required
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
            placeholder={t("concierge.form.contactPlaceholder")}
            className={fieldBase}
          />
        </label>
      </div>

      <label className="mt-5 flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-label text-muted">
          {t("concierge.form.item")}
        </span>
        <input
          required
          value={form.item}
          onChange={(e) => update("item", e.target.value)}
          placeholder={t("concierge.form.itemPlaceholder")}
          className={fieldBase}
        />
      </label>

      <label className="mt-5 flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-label text-muted">
          {t("concierge.form.budget")}
        </span>
        <input
          value={form.budget}
          onChange={(e) => update("budget", e.target.value)}
          placeholder={t("concierge.form.budgetPlaceholder")}
          className={fieldBase}
        />
      </label>

      <label className="mt-5 flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-label text-muted">
          {t("concierge.form.notes")}
        </span>
        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder={t("concierge.form.notesPlaceholder")}
          className={`${fieldBase} resize-none`}
        />
      </label>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="gold-solid" size="lg" className="flex-1">
          {t("concierge.form.submit")}
        </Button>
        <Button
          href={telegramLink(buildTelegramMessage(form))}
          external
          variant="gold-outline"
          size="lg"
          className="flex-1"
        >
          <Send size={15} />
          {t("concierge.form.sendTelegram")}
        </Button>
      </div>
    </form>
  );
}
