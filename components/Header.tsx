'use client';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import type { TenantConfig } from '../lib/types';
import { usePathname } from 'next/navigation';

export default function Header({ tenant }: { tenant: TenantConfig }) {
    const pathname = usePathname();
    return (
        <header className="header p-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="font-bold text-lg" style={{ color: 'var(--brand)' }}>{tenant.name}</div>
                    <nav className="flex gap-3">
                        {tenant.routes.includes('/') && (
                            <Link href="/" className={pathname === '/' ? 'underline' : ''}>Home</Link>
                        )}
                        {tenant.routes.includes('/information') && (
                            <Link href="/information" className={pathname === '/information' ? 'underline' : ''}>Information</Link>
                        )}
                        {tenant.routes.includes('/profile') && (
                            <Link href="/profile" className={pathname === '/profile' ? 'underline' : ''}>Profile</Link>
                        )}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
