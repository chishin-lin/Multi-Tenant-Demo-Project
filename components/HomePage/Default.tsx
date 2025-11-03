'use client'
import Banner from '../common/Banner';
import { useTenant } from '../TenantProvider';
import { t } from '../../lib/i18n';

export default function DefaultHome() {
    const { locale } = useTenant();

    return (
        <div className="p-6">
            <Banner />
            <p className="mt-4 text-gray-700 leading-relaxed">
                {t('defaultHomePage', locale)}
            </p>
        </div>
    );
}
