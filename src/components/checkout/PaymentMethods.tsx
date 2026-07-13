"use client";

import { CreditCard, Send, Wallet, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export type PaymentMethod = "payme" | "click" | "uzcard" | "telegram";

type Method = {
  id: PaymentMethod;
  labelKey: string;
  hintKey: string;
  icon: LucideIcon;
  /** Placeholder methods show a "soon" badge until the API is wired up. */
  soon: boolean;
};

const METHODS: Method[] = [
  {
    id: "payme",
    labelKey: "checkout.payment.payme",
    hintKey: "checkout.payment.paymeHint",
    icon: Smartphone,
    soon: true,
  },
  {
    id: "click",
    labelKey: "checkout.payment.click",
    hintKey: "checkout.payment.clickHint",
    icon: Wallet,
    soon: true,
  },
  {
    id: "uzcard",
    labelKey: "checkout.payment.uzcard",
    hintKey: "checkout.payment.uzcardHint",
    icon: CreditCard,
    soon: true,
  },
  {
    id: "telegram",
    labelKey: "checkout.payment.telegram",
    hintKey: "checkout.payment.telegramHint",
    icon: Send,
    soon: false,
  },
];

export function PaymentMethods({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
}) {
  const { t } = useLocale();

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {METHODS.map(({ id, labelKey, hintKey, icon: Icon, soon }) => {
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex items-start gap-3 border p-4 text-left transition-colors duration-300 ${
              active
                ? "border-gold bg-gold/[0.06]"
                : "border-line hover:border-gold/50"
            }`}
          >
            {/* radio dot */}
            <span
              className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                active ? "border-gold" : "border-line"
              }`}
            >
              {active ? <span className="h-2 w-2 rounded-full bg-gold" /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <Icon size={16} strokeWidth={1.4} className="text-gold" />
                <span className="text-[14px] text-ink">{t(labelKey)}</span>
                {soon ? (
                  <span className="ml-auto text-[10px] uppercase tracking-wide text-muted/70">
                    {t("checkout.payment.soon")}
                  </span>
                ) : null}
              </span>
              <span className="mt-1.5 block text-[12px] leading-relaxed text-muted">
                {t(hintKey)}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
