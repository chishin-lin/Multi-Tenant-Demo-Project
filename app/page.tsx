import { getTenantFromHost } from '../lib/tenants';
import { headers, cookies } from 'next/headers';
import { t } from '../lib/i18n';
import Client1Home from '@/components/HomePage/Client1Home';
import Client2Home from '@/components/HomePage/Client2Home';
import DefaultHome from '@/components/HomePage/Default';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const hdrs = headers();
  const host = (await hdrs).get('host') ?? undefined;
  const tenant = getTenantFromHost(host);
  const cookieStore = cookies();
  const locale = ((await cookieStore).get('lang')?.value as 'en' | 'zh') ?? 'en';

  let HomeComponent;
  switch (tenant.homeLayout) {
    case 'sports':
      HomeComponent = <Client1Home />;
      break;
    case 'slots':
      HomeComponent = <Client2Home />;
      break;
    default:
      HomeComponent = <DefaultHome />;
  }
  return (
    <section>
      <h1 className="text-3xl font-bold">{t('home.heading', locale)}</h1>
      <p className="mt-4">{t('home.welcome', locale)}</p>
      <div className="mt-6">
        <div className="p-4 border rounded shadow-sm">
          <strong>Tenant:</strong> {tenant.name}
        </div>
        {HomeComponent}
      </div>
    </section>
  );
}

export async function generateMetadata() {
  const hdrs = headers();
  const host = (await hdrs).get('host') ?? undefined;
  const tenant = getTenantFromHost(host);
  const cookieStore = cookies();
  const locale = ((await cookieStore).get('lang')?.value as 'en' | 'zh') ?? 'en';
  return {
    title: `${tenant.titleSuffix ?? ''}`,
    description: t('home.welcome', locale),
    openGraph: {
      title: `${t('home.title', locale)} ${tenant.titleSuffix ?? ''}`,
      description: t('home.welcome', locale),
    },
  };
}