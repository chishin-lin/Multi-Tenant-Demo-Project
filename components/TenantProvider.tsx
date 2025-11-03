'use client';
import React, { createContext, useContext } from 'react';
import type { TenantConfig } from '../lib/types';
import type { Locale } from '../lib/i18n';

type TenantContextType = {
    tenant: TenantConfig;
    locale: Locale;
    // setLocale: (locale: string) => void;
};

const TenantContext = createContext<TenantContextType | null>(null);

export function TenantProvider({ tenant,
    locale,
    children, }: {
        tenant: TenantConfig;
        locale: Locale;
        children: React.ReactNode;
    }) {

    return (
        <TenantContext.Provider value={{ tenant, locale }}>
            {/* 設定全域 CSS 變數，供 Tailwind / CSS 直接使用 */}
            <div
                style={
                    {
                        '--brand': tenant.theme.brand,
                        '--accent': tenant.theme.accent,
                        '--text': tenant.theme.text,
                    } as React.CSSProperties
                }
            >
                {children}
            </div>
        </TenantContext.Provider>
    );
}

export function useTenant() {
    const ctx = useContext(TenantContext);
    if (!ctx) throw new Error('useTenant must be used inside TenantProvider');
    return ctx;
}
