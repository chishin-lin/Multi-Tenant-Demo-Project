import { useTenant } from '../TenantProvider';
import { useResponsive } from '../../hooks/useResponsive';


const games = Array.from({ length: 12 }, (_, i) => `Slot Game ${i + 1}`);

export default function GameGrid() {
    const { tenant } = useTenant();
    console.log("GameGrid", tenant)


    return (
        <div className="grid grid-cols-3 gap-4 mt-4 w-[50%] md:w-[100%]">
            {games.map((g, i) => (
                <div key={i} className="max-w-[200px] max-h-[200px] bg-red-100 rounded-xl flex items-center justify-center shadow-lg">
                    {g}
                </div>
            ))}
        </div>
    );
}
