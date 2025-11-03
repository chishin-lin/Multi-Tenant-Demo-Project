// lib/i18n.ts
export type Locale = "en" | "zh";

let cache: Record<Locale, any> | null = null;

/**
 * ✅ 安全載入翻譯字典
 * - Server 端用動態 import (不使用 fs)
 * - Client 端用 require (打包時包含)
 */
async function loadLocales(): Promise<Record<Locale, any>> {
    if (cache) return cache;

    if (typeof window === "undefined") {
        // ✅ Server 端（Next.js SSR）
        const [{ default: en }, { default: zh }] = await Promise.all([
            import("../locales/en.json", { with: { type: "json" } }),
            import("../locales/zh.json", { with: { type: "json" } }),
        ]);
        cache = { en, zh };
    } else {
        // ✅ Client 端（瀏覽器）
        // require 會在編譯時由 Next.js 打包成靜態 JSON
        const en = require("../locales/en.json");
        const zh = require("../locales/zh.json");
        cache = { en, zh };
    }

    return cache!;
}

/**
 * ✅ 翻譯函式
 * - 支援巢狀 key：t('home.welcome', 'zh')
 * - 若 key 不存在則回傳 key 本身
 */
export function t(key: string, locale: Locale): string {
    if (!cache) {
        // 若 client 首次呼叫 t() 時還沒載入過
        const en = require("../locales/en.json");
        const zh = require("../locales/zh.json");
        cache = { en, zh };
    }

    const dict = cache?.[locale] ?? {};
    return key.split(".").reduce((acc, part) => acc?.[part], dict) ?? key;
}

/**
 * ✅ 取得全部翻譯（Server Component 可用）
 * - 可用於 getStaticProps / metadata / SSR 預載
 */
export async function getAllTranslations(locale: Locale) {
    const dicts = await loadLocales();
    return dicts[locale];
}
