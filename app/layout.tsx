import './globals.css';
import { ReactNode } from 'react';
import { headers, cookies } from 'next/headers';
import LayoutEngine from '../components/LayoutEngine';
import { getTenantFromHost } from '../lib/tenants';
import type { Locale } from '../lib/i18n';
import { TenantProvider } from '@/components/TenantProvider';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const hdrs = headers();
  const host = (await hdrs).get('host') ?? undefined;
  const tenant = getTenantFromHost(host);
  const cookieStore = cookies();
  const langCookie = (await cookieStore).get('lang')?.value as Locale | undefined;
  const locale: Locale = langCookie ?? 'en';

  const style = {
    '--brand': tenant.theme.brand,
    '--accent': tenant.theme.accent,
    '--text': tenant.theme.text,
  } as React.CSSProperties;

  return (
    <html lang={locale}>
      <body style={style}>
        {/* 將租戶設定全域化 */}
        <TenantProvider tenant={{ ...tenant }} locale={locale}>
          <LayoutEngine>{children}</LayoutEngine>
        </TenantProvider>
      </body>
    </html>
  );
}
