'use client';
import { t } from '../../lib/i18n';
import { useTenant } from '../TenantProvider';


const sports = [{ id: 'soccer', icon: "⚽️" }, { id: 'basketball', icon: "🏀" }, { id: 'tennis', icon: "🎾" }, { id: 'baseball', icon: "⚾️" }];

export default function SportList() {
    const { locale } = useTenant();

    return (
        <div
            className="flex justify-between my-10"
        >
            {sports.map((sport) => (
                <div
                    key={sport.id}
                    className="bg-[var(--brand)] text-white rounded-lg flex flex-col items-center justify-center w-[20%] h-28 sm:h-40"
                >
                    <div className="text-[2rem] mb-2">{sport.icon}</div>
                    <div>{t(sport.id, locale)}</div>
                </div>
            ))}
        </div>
    );
}
