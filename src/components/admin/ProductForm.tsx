"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { resolveText } from "@/lib/text";
import type { Product, Category } from "@/data/products";

const CATEGORIES: Category[] = ["watches", "clothing", "bags", "accessories"];

const field =
  "w-full border border-line bg-surface px-3 py-2.5 text-[14px] text-ink placeholder:text-muted/60 focus:border-gold focus:outline-none";
const label = "mb-1.5 block text-[11px] uppercase tracking-label text-muted";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type SpecRow = { label: string; value: string };

/** Add / edit a single product. Emits a full Product on save. */
export function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null;
  onSave: (p: Product) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [brand, setBrand] = useState(product?.brand ?? "");
  const [category, setCategory] = useState<Category>(
    product?.category ?? "watches",
  );
  const [priceUzs, setPriceUzs] = useState(String(product?.priceUzs ?? ""));
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl ?? "");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [availability, setAvailability] = useState<"inStock" | "onOrder">(
    product?.availability ?? "inStock",
  );
  const [images, setImages] = useState<string[]>(
    product?.images.length ? product.images : [""],
  );
  const [descUz, setDescUz] = useState(product?.description.uz ?? "");
  const [descRu, setDescRu] = useState(product?.description.ru ?? "");
  const [descEn, setDescEn] = useState(product?.description.en ?? "");
  const [specs, setSpecs] = useState<SpecRow[]>(
    product?.specs.map((s) => ({
      label: resolveText(s.label, "uz"),
      value: resolveText(s.value, "uz"),
    })) ?? [],
  );
  const [error, setError] = useState("");

  function submit() {
    if (!name.trim() || !brand.trim()) {
      setError("Nom va brend majburiy.");
      return;
    }
    const finalSlug = slugify(slug || name);
    if (!finalSlug) {
      setError("Slug (havola) noto'g'ri.");
      return;
    }
    const cleanImages = images.map((i) => i.trim()).filter(Boolean);
    const built: Product = {
      id: product?.id ?? `p-${Date.now().toString(36)}`,
      slug: finalSlug,
      name: name.trim(),
      brand: brand.trim(),
      category,
      priceUzs: Number(priceUzs) || 0,
      images: cleanImages.length ? cleanImages : [""],
      videoUrl: videoUrl.trim() || undefined,
      description: { uz: descUz, ru: descRu, en: descEn },
      specs: specs
        .filter((s) => s.label.trim() || s.value.trim())
        .map((s) => ({ label: s.label.trim(), value: s.value.trim() })),
      featured,
      availability,
    };
    onSave(built);
  }

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-emerald-deep/40 backdrop-blur-sm">
      <div className="h-full w-full max-w-2xl overflow-y-auto border-l border-line bg-base">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-base px-6 py-5">
          <h2 className="font-serif text-xl text-emerald">
            {product ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
          </h2>
          <button onClick={onCancel} aria-label="Yopish" className="text-muted hover:text-gold">
            <X size={22} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={label}>Nomi *</label>
              <input
                className={field}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!product && !slug) setSlug(slugify(e.target.value));
                }}
                placeholder="Submariner Date"
              />
            </div>
            <div>
              <label className={label}>Brend *</label>
              <input className={field} value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Rolex" />
            </div>
            <div>
              <label className={label}>Slug (havola)</label>
              <input className={field} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="rolex-submariner" />
            </div>
            <div>
              <label className={label}>Kategoriya</label>
              <select className={field} value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Narx (so'm)</label>
              <input className={field} type="number" value={priceUzs} onChange={(e) => setPriceUzs(e.target.value)} placeholder="189000000" />
            </div>
            <div>
              <label className={label}>Mavjudligi</label>
              <select className={field} value={availability} onChange={(e) => setAvailability(e.target.value as "inStock" | "onOrder")}>
                <option value="inStock">Sotuvda</option>
                <option value="onOrder">Buyurtma asosida</option>
              </select>
            </div>
            <div className="flex items-end pb-2">
              <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink">
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                Tanlangan (bosh sahifada)
              </label>
            </div>
          </div>

          {/* Video */}
          <div>
            <label className={label}>Obzor video (YouTube / Vimeo / .mp4)</label>
            <input className={field} value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." />
          </div>

          {/* Images */}
          <div>
            <label className={label}>Rasmlar (URL)</label>
            <div className="space-y-2">
              {images.map((im, i) => (
                <div key={i} className="flex items-center gap-2">
                  {im ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={im} alt="" className="h-10 w-10 shrink-0 object-cover" />
                  ) : (
                    <span className="h-10 w-10 shrink-0 bg-surface-2" />
                  )}
                  <input
                    className={field}
                    value={im}
                    onChange={(e) => setImages((a) => a.map((x, j) => (j === i ? e.target.value : x)))}
                    placeholder="https://..."
                  />
                  <button onClick={() => setImages((a) => a.filter((_, j) => j !== i))} className="shrink-0 text-muted hover:text-gold" aria-label="O'chirish">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button onClick={() => setImages((a) => [...a, ""])} className="flex items-center gap-1.5 text-[12px] text-emerald hover:text-gold">
                <Plus size={14} /> Rasm qo'shish
              </button>
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid gap-3">
            <div>
              <label className={label}>Tavsif — UZ</label>
              <textarea className={`${field} resize-none`} rows={3} value={descUz} onChange={(e) => setDescUz(e.target.value)} />
            </div>
            <div>
              <label className={label}>Tavsif — RU</label>
              <textarea className={`${field} resize-none`} rows={3} value={descRu} onChange={(e) => setDescRu(e.target.value)} />
            </div>
            <div>
              <label className={label}>Tavsif — EN</label>
              <textarea className={`${field} resize-none`} rows={3} value={descEn} onChange={(e) => setDescEn(e.target.value)} />
            </div>
          </div>

          {/* Specs */}
          <div>
            <label className={label}>Xususiyatlar</label>
            <div className="space-y-2">
              {specs.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input className={field} value={s.label} placeholder="Mexanizm" onChange={(e) => setSpecs((a) => a.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
                  <input className={field} value={s.value} placeholder="Avtomatik" onChange={(e) => setSpecs((a) => a.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} />
                  <button onClick={() => setSpecs((a) => a.filter((_, j) => j !== i))} className="shrink-0 text-muted hover:text-gold" aria-label="O'chirish">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button onClick={() => setSpecs((a) => [...a, { label: "", value: "" }])} className="flex items-center gap-1.5 text-[12px] text-emerald hover:text-gold">
                <Plus size={14} /> Xususiyat qo'shish
              </button>
            </div>
          </div>

          {error ? <p className="text-[13px] text-red-600">{error}</p> : null}

          <div className="flex gap-3 border-t border-line pt-5">
            <button onClick={submit} className="flex h-11 flex-1 items-center justify-center bg-emerald px-6 text-[12px] uppercase tracking-label text-ivory transition-colors hover:bg-gold hover:text-emerald-deep">
              Saqlash
            </button>
            <button onClick={onCancel} className="flex h-11 items-center justify-center border border-line px-6 text-[12px] uppercase tracking-label text-muted hover:text-emerald">
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
