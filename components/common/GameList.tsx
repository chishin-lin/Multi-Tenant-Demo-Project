'use client';
import { useTenant } from '../TenantProvider';
const topGames = ['Slot King', 'Lucky 7', 'Treasure Spin', 'Fruit Bomb', 'Mega Reels'];

export default function GameList() {
    const { tenant } = useTenant();
    console.log('GameList', tenant)
    // "mt-6 space-y-2 flex-col gap-4 w-[50%] md:w-[100%]"
    return (
        <div className={`mt-6 grid gap-4 grid-cols-${tenant.layout.mobileColumns} md:grid-cols-${tenant.layout.desktopColumns}`}>
            {topGames.map((g, i) => (
                <div key={i} className="flex justify-between bg-red-50 p-3 rounded-lg shadow-inner w-[45%] md:w-[100%]">
                    <span>{i + 1}. {g}</span>
                </div>
            ))}
        </ div>
    );
}
