import { headers, cookies } from 'next/headers';
import { getTenantFromHost } from '../../lib/tenants';
import { t } from '../../lib/i18n';

export default async function Information() {
    const hdrs = headers();
    const host = (await hdrs).get('host') ?? undefined;
    const tenant = getTenantFromHost(host);
    const cookieStore = cookies();
    const locale = ((await cookieStore).get('lang')?.value as 'en' | 'zh') ?? 'en';

    if (!tenant.routes.includes('/information')) {
        return <div className="p-6">{tenant.name} {t('notAuthorized', locale)}</div>;
    }

    return (
        <section>
            <h1 className="text-2xl font-bold">{t('information.heading', locale)}</h1>
            <p className="mt-3">{t('information.welcome', locale)} {tenant.name}</p>
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
        title: `${t('informatio.heading', locale)} ${tenant.titleSuffix ?? ''}`,
        description: t('information.welcome', locale),
    };
}