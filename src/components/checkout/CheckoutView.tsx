"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { PageIntro } from "@/components/ui/PageIntro";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { PaymentMethods, type PaymentMethod } from "./PaymentMethods";
import { formatPrice } from "@/lib/format";
import { telegramLink } from "@/config/site";
import { notifyLead } from "@/lib/notify";

const fieldBase =
  "w-full border border-line bg-surface/40 px-4 py-3.5 text-[14px] text-ink placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none";

type CheckoutForm = {
  name: string;
  phone: string;
  email: string;
  telegram: string;
  city: string;
  address: string;
  notes: string;
};

const EMPTY: CheckoutForm = {
  name: "",
  phone: "",
  email: "",
  telegram: "",
  city: "",
  address: "",
  notes: "",
};

export function CheckoutView() {
  const { t, locale } = useLocale();
  const { items, subtotal, isReady, clear } = useCart();

  const [form, setForm] = useState<CheckoutForm>(EMPTY);
  const [payment, setPayment] = useState<PaymentMethod>("telegram");
  const [done, setDone] = useState(false);

  function update<K extends keyof CheckoutForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Build a human-readable order summary (used for the Telegram fallback).
    const itemsText = items
      .map(
        (i) =>
          `• ${i.quantity}× ${i.product.brand} ${i.product.name} — ${formatPrice(
            i.product.priceUzs * i.quantity,
            locale,
          )}`,
      )
      .join("\n");
    const message = t("checkout.telegramMessage", {
      items: itemsText,
      total: formatPrice(subtotal, locale),
      name: form.name,
      phone: form.phone,
    });

    // Best-effort delivery to the boutique's Telegram (via /api/notify).
    void notifyLead(`Order · ${payment}`, message);

    // ------------------------------------------------------------------
    //  PAYMENT INTEGRATION POINTS
    //  Wire real gateways here. Each branch currently simulates success.
    //  - Payme:  create a transaction via the Payme Merchant API, then
    //            redirect to the returned checkout URL.
    //            Docs: https://developer.help.paycom.uz/
    //  - Click:  create an invoice via the Click Merchant API (SHOP_ID,
    //            SERVICE_ID, secret key), then redirect to the pay URL.
    //            Docs: https://docs.click.uz/
    //  - Uzcard/Humo: usually flows through Payme/Click or a bank acquirer.
    //  Recommended: POST `form` + cart to a Next.js Route Handler
    //  (app/api/checkout/route.ts) that talks to the gateway server-side.
    // ------------------------------------------------------------------
    switch (payment) {
      case "telegram":
        // Open the pre-filled Telegram order in a new tab.
        window.open(telegramLink(message), "_blank", "noopener,noreferrer");
        break;
      case "payme":
      case "click":
      case "uzcard":
      default:
        // TODO: replace with a real gateway redirect once credentials exist.
        break;
    }

    clear();
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---- Success state ------------------------------------------------
  if (done) {
    return (
      <>
        <PageIntro title={t("checkout.title")} />
        <div className="mx-auto flex max-w-shell flex-col items-center px-6 py-28 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold">
            <Check size={30} strokeWidth={1.4} />
          </span>
          <h2 className="mt-7 font-serif text-3xl text-ink">
            {t("checkout.success.title")}
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
            {t("checkout.success.text")}
          </p>
          <div className="mt-9">
            <Button href="/" variant="gold-solid" size="lg">
              {t("checkout.success.home")}
            </Button>
          </div>
        </div>
      </>
    );
  }

  // ---- Empty cart ---------------------------------------------------
  if (isReady && items.length === 0) {
    return (
      <>
        <PageIntro title={t("checkout.title")} />
        <div className="mx-auto flex max-w-shell flex-col items-center px-6 py-28 text-center">
          <p className="font-serif text-2xl text-ink">{t("checkout.empty")}</p>
          <div className="mt-8">
            <Button href="/catalog" variant="gold-solid" size="lg">
              {t("cart.browse")}
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageIntro title={t("checkout.title")} subtitle={t("checkout.subtitle")} />

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-shell px-6 py-12 md:px-10 md:py-16"
      >
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* Fields */}
          <div className="flex flex-col gap-12">
            {/* Contact */}
            <fieldset>
              <legend className="eyebrow mb-6">
                {t("checkout.contact.title")}
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label={t("checkout.contact.name")}
                  required
                  value={form.name}
                  onChange={(v) => update("name", v)}
                />
                <Field
                  label={t("checkout.contact.phone")}
                  required
                  type="tel"
                  placeholder="+998 90 000 00 00"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                />
                <Field
                  label={t("checkout.contact.email")}
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                />
                <Field
                  label={t("checkout.contact.telegram")}
                  placeholder="@username"
                  value={form.telegram}
                  onChange={(v) => update("telegram", v)}
                />
              </div>
            </fieldset>

            {/* Delivery */}
            <fieldset>
              <legend className="eyebrow mb-6">
                {t("checkout.delivery.title")}
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label={t("checkout.delivery.city")}
                  required
                  value={form.city}
                  onChange={(v) => update("city", v)}
                />
                <Field
                  label={t("checkout.delivery.address")}
                  required
                  placeholder={t("checkout.delivery.addressPlaceholder")}
                  value={form.address}
                  onChange={(v) => update("address", v)}
                />
              </div>
              <div className="mt-5">
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-label text-muted">
                    {t("checkout.delivery.notes")}
                  </span>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder={t("checkout.delivery.notesPlaceholder")}
                    className={`${fieldBase} resize-none`}
                  />
                </label>
              </div>
            </fieldset>

            {/* Payment */}
            <fieldset>
              <legend className="eyebrow mb-2">
                {t("checkout.payment.title")}
              </legend>
              <p className="mb-6 text-[13px] leading-relaxed text-muted">
                {t("checkout.payment.subtitle")}
              </p>
              <PaymentMethods value={payment} onChange={setPayment} />
            </fieldset>
          </div>

          {/* Order summary */}
          <aside>
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <div className="border border-line bg-surface/40 p-7">
                <h2 className="font-serif text-xl text-ink">
                  {t("checkout.summary")}
                </h2>

                <ul className="mt-6 space-y-4">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3">
                      <div className="relative aspect-square w-14 shrink-0 overflow-hidden bg-surface">
                        <SafeImage
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold px-1 text-[10px] text-base">
                          {quantity}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] text-ink">
                          {product.name}
                        </p>
                        <p className="text-[11px] uppercase tracking-wide text-muted">
                          {product.brand}
                        </p>
                      </div>
                      <span className="text-[13px] text-muted">
                        {formatPrice(product.priceUzs * quantity, locale)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="my-6 rule-gold" />

                <div className="flex items-baseline justify-between">
                  <span className="text-[14px] text-ink">
                    {t("cart.total")}
                  </span>
                  <span className="font-serif text-lg text-emerald">
                    {formatPrice(subtotal, locale)}
                  </span>
                </div>

                <div className="mt-7">
                  <Button
                    type="submit"
                    variant="gold-solid"
                    size="lg"
                    className="w-full"
                  >
                    {t("checkout.place")}
                  </Button>
                </div>
                <Link
                  href="/cart"
                  className="mt-4 block text-center text-[11px] uppercase tracking-label text-muted transition-colors hover:text-gold"
                >
                  ← {t("nav.cart")}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </>
  );
}

/** Small labelled text input used throughout the checkout form. */
function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-label text-muted">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={fieldBase}
      />
    </label>
  );
}
