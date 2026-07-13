"use client";
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  LogOut,
  Lock,
  ExternalLink,
} from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import { ProductForm } from "./ProductForm";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/data/products";

const SESSION_KEY = "obid-admin";

export function AdminApp() {
  const { products, saveAll, reset } = useProducts();
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [editing, setEditing] = useState<Product | null | "new">(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
    } catch {
      /* ignore */
    }
    setChecked(true);
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean };
      if (data.ok) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setAuthed(true);
      } else {
        setLoginError("Parol noto'g'ri.");
      }
    } catch {
      setLoginError("Xatolik yuz berdi.");
    }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }

  function handleSave(p: Product) {
    const exists = products.some((x) => x.id === p.id);
    const next = exists
      ? products.map((x) => (x.id === p.id ? p : x))
      : [p, ...products];
    saveAll(next);
    setEditing(null);
  }

  function handleDelete(id: string) {
    if (!window.confirm("Ushbu mahsulotni o'chirasizmi?")) return;
    saveAll(products.filter((p) => p.id !== id));
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(products, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "obid-products.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (Array.isArray(parsed) && parsed.length) {
          saveAll(parsed as Product[]);
          window.alert("Import muvaffaqiyatli.");
        } else {
          window.alert("Fayl formati noto'g'ri.");
        }
      } catch {
        window.alert("JSON o'qib bo'lmadi.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  if (!checked) return <div className="min-h-screen" />;

  // ---- Login gate --------------------------------------------------
  if (!authed) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 pt-[var(--header-h)]">
        <form onSubmit={login} className="w-full max-w-sm border border-line bg-surface p-8 text-center shadow-card">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
            <Lock size={20} />
          </span>
          <h1 className="mt-5 font-serif text-2xl text-emerald">Admin panel</h1>
          <p className="mt-2 text-[13px] text-muted">Boshqaruv paneliga kirish</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parol"
            className="mt-6 w-full border border-line bg-base px-4 py-3 text-[14px] text-ink focus:border-gold focus:outline-none"
          />
          {loginError ? <p className="mt-3 text-[13px] text-red-600">{loginError}</p> : null}
          <button type="submit" className="mt-5 h-11 w-full bg-emerald text-[12px] uppercase tracking-label text-ivory transition-colors hover:bg-gold hover:text-emerald-deep">
            Kirish
          </button>
          <p className="mt-4 text-[11px] text-muted/70">Standart parol: 7777 (ADMIN_PASSWORD env orqali o'zgartiring)</p>
        </form>
      </div>
    );
  }

  // ---- Dashboard ---------------------------------------------------
  return (
    <div className="mx-auto max-w-shell px-4 pb-24 pt-[calc(var(--header-h)+2rem)] md:px-8">
      <div className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Boshqaruv paneli</span>
          <h1 className="mt-2 font-serif text-3xl text-emerald md:text-4xl">
            Mahsulotlar — {products.length}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setEditing("new")} className="flex items-center gap-2 bg-emerald px-4 py-2.5 text-[11px] uppercase tracking-label text-ivory transition-colors hover:bg-gold hover:text-emerald-deep">
            <Plus size={15} /> Yangi mahsulot
          </button>
          <button onClick={exportJson} className="flex items-center gap-2 border border-line px-4 py-2.5 text-[11px] uppercase tracking-label text-emerald hover:border-gold hover:text-gold">
            <Download size={15} /> Export
          </button>
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 border border-line px-4 py-2.5 text-[11px] uppercase tracking-label text-emerald hover:border-gold hover:text-gold">
            <Upload size={15} /> Import
          </button>
          <input ref={fileRef} type="file" accept="application/json" onChange={importJson} className="hidden" />
          <button onClick={() => { if (window.confirm("Standart mahsulotlarga qaytarilsinmi?")) reset(); }} className="flex items-center gap-2 border border-line px-4 py-2.5 text-[11px] uppercase tracking-label text-muted hover:border-gold hover:text-gold">
            <RotateCcw size={15} /> Reset
          </button>
          <button onClick={logout} className="flex items-center gap-2 border border-line px-4 py-2.5 text-[11px] uppercase tracking-label text-muted hover:border-gold hover:text-gold">
            <LogOut size={15} /> Chiqish
          </button>
        </div>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-muted">
        O'zgarishlar shu brauzerda saqlanadi (localStorage). Barcha tashrif buyuruvchilar
        uchun jonli qilish uchun <b>Export</b> qiling va faylni saytga ulang (README'da).
      </p>

      {/* Table */}
      <div className="mt-6 overflow-x-auto border border-line">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead className="border-b border-line bg-surface-2 text-[11px] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-normal">Rasm</th>
              <th className="px-4 py-3 font-normal">Brend / Nomi</th>
              <th className="px-4 py-3 font-normal">Kategoriya</th>
              <th className="px-4 py-3 font-normal">Narx</th>
              <th className="px-4 py-3 font-normal">Holat</th>
              <th className="px-4 py-3 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0 hover:bg-surface-2/50">
                <td className="px-4 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images[0]} alt="" className="h-12 w-12 object-cover" />
                </td>
                <td className="px-4 py-3">
                  <span className="block text-[11px] uppercase tracking-wide text-muted">{p.brand}</span>
                  <span className="text-ink">{p.name}</span>
                  {p.featured ? <span className="ml-2 text-[10px] uppercase tracking-wide text-gold">★</span> : null}
                  {p.videoUrl ? <span className="ml-1 text-[10px] uppercase tracking-wide text-gold">▶</span> : null}
                </td>
                <td className="px-4 py-3 text-muted">{p.category}</td>
                <td className="nums px-4 py-3 text-ink">{formatPrice(p.priceUzs, "uz")}</td>
                <td className="px-4 py-3 text-muted">{p.availability === "onOrder" ? "Buyurtma" : "Sotuvda"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/product/${p.slug}`} target="_blank" className="text-muted hover:text-gold" aria-label="Ko'rish"><ExternalLink size={16} /></Link>
                    <button onClick={() => setEditing(p)} className="text-emerald hover:text-gold" aria-label="Tahrirlash"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-muted hover:text-red-600" aria-label="O'chirish"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing !== null ? (
        <ProductForm
          product={editing === "new" ? null : editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      ) : null}
    </div>
  );
}
