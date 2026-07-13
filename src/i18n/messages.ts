import uz from "@messages/uz.json";
import ru from "@messages/ru.json";
import en from "@messages/en.json";
import type { Locale } from "./config";

/**
 * The UZ message file is the source of truth for the shape of the dictionary.
 * RU and EN mirror the same keys.
 */
export type Messages = typeof uz;

export const messages: Record<Locale, Messages> = {
  uz: uz as Messages,
  ru: ru as Messages,
  en: en as Messages,
};
