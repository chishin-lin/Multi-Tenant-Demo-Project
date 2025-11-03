'use client';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTenant } from './TenantProvider';

export default function LayoutEngine({ children }: { children: React.ReactNode }) {
    const { tenant } = useTenant();

    return (
        <div className="min-h-screen flex flex-col text-[var(--text)] bg-white">
            <Header tenant={tenant} />
            <main className="flex-1 container mx-auto p-6">{children}</main>
            <Footer tenant={tenant} />
        </div>
    );
}
