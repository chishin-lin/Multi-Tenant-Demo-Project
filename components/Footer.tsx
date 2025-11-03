'use client';
import type { TenantConfig } from '../lib/types';

export default function Footer({ tenant }: { tenant: TenantConfig }) {
    return (
        <footer className="p-6 text-sm text-center border-t mt-8">
            <div>© {new Date().getFullYear()} {tenant.name}</div>
        </footer>
    );
}
