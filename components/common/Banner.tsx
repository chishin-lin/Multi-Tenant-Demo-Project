'use client';
import { useTenant } from '../TenantProvider';
import { t } from '../../lib/i18n';


export default function Banner() {
    const { tenant, locale } = useTenant();




    return (
        <div className="w-full bg-gradient-to-r from-[var(--brand)] to--[var(--accent)] rounded-2xl p-10 text-center text-xl font-bold">
            {t(`homeBannerTitle.${tenant.id}`, locale)}
        </div>
    );
}