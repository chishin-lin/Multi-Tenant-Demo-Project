'use client';
import { t } from '../../lib/i18n';
import { useTenant } from '../TenantProvider';

const matches = [
    { teamA: 'tiger', teamB: 'eagle', score: '2 - 1' },
    { teamA: 'dragon', teamB: 'wolves', score: '1 - 3' },
];

export default function MatchList() {
    const { locale } = useTenant();

    return (
        <div className="mt-6 space-y-2">
            {matches.map((m, i) => (
                <div key={i} className="flex justify-between bg-gray-100 p-3 rounded-lg">
                    <span>{t(m.teamA, locale)} vs {t(m.teamA, locale)}</span>
                    <span className="font-bold">{m.score}</span>
                </div>
            ))}
        </div>
    );
}
