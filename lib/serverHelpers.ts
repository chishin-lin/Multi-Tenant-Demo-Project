// lib/serverHelpers.ts
import type { TenantConfig } from './types';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import type { Locale } from './i18n';

/**
 * Small server-side helpers for common tasks:
 *  - isRouteAllowed: pure check
 *  - assertRouteAllowed: call in server component to trigger 404 if not allowed
 *  - getLocaleFromCookies: convenience to obtain lang from cookies (default 'en')
 */

/** Pure check whether tenant allows path (exact match). */
export function isRouteAllowed(tenant: TenantConfig, pathname: string) {
    // Expect pathname like '/' or '/information' or '/profile'
    return tenant.routes.includes(pathname);
}

/**
 * In server components you can call assertRouteAllowed(tenant, pathname)
 * which will call next/navigation notFound() (render 404) if route is not allowed.
 */
export function assertRouteAllowed(tenant: TenantConfig, pathname: string) {
    if (!isRouteAllowed(tenant, pathname)) {
        notFound();
    }
}

/** Read lang cookie server-side (from next/headers cookies()) */
export async function getLocaleFromCookies(): Promise<Locale> {
    try {
        const cookieStore = cookies();
        const lang = (await cookieStore).get('lang')?.value as Locale | undefined;
        return lang ?? 'en';
    } catch (err) {
        return 'en';
    }
}
