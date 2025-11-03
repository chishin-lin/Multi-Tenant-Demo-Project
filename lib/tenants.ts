import type { TenantConfig } from './types';

export type TenantId = 'client1' | 'client2' | 'client3' | 'default';

export const TENANTS: Record<TenantId, TenantConfig> = {
    client1: {
        id: 'client1',
        name: 'Client One',
        hostnames: ['client1.local.test'],
        theme: {
            brand: '#0ea5e9',
            accent: '#0369a1',
            text: '#0f172a',
        },
        routes: ['/', '/information'],
        titleSuffix: '— Client One',
        homeLayout: 'sports',
        layout: { mobileColumns: 2, desktopColumns: 6 },
    },
    client2: {
        id: 'client2',
        name: 'Client Two',
        hostnames: ['client2.local.test'],
        theme: {
            brand: '#ef4444',
            accent: '#b91c1c',
            text: '#111827',
        },
        routes: ['/', '/profile'],
        titleSuffix: '— Client Two',
        homeLayout: 'slots',
        layout: { mobileColumns: 1, desktopColumns: 4 },
    },
    client3: {
        id: 'client3',
        name: 'Client three',
        hostnames: ['client3.local.test'],
        theme: {
            brand: '#ef4444',
            accent: '#b91c1c',
            text: '#111827',
        },
        routes: ['/', '/profile'],
        titleSuffix: '— Client Two',
        homeLayout: 'slots',
        layout: { mobileColumns: 1, desktopColumns: 4 },
    },
    default: {
        id: 'default',
        name: 'Public',
        hostnames: ['local.test', '127.0.0.1', 'localhost'],
        theme: {
            brand: '#6b7280',
            accent: '#374151',
            text: '#0f172a',
        },
        routes: ['/', '/information', '/profile'],
        titleSuffix: '— Public',
        homeLayout: 'default',
        layout: { mobileColumns: 1, desktopColumns: 3 },
    },
};

export function getTenantFromHost(host: string | undefined) {
    if (!host) return TENANTS.default;
    const hostname = host.split(':')[0];
    for (const t of Object.values(TENANTS)) {
        if (t.hostnames.includes(hostname)) return t;
    }
    return TENANTS.default;
}