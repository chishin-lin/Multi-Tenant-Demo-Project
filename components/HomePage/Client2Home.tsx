"use client"
import Banner from '../common/Banner';
import GameGrid from '../common/GameGrid';
import GameList from '../common/GameList';


export default function Client2Home() {

    return (
        <div className="p-6">
            <Banner />
            <div className='flex flex-col sm:flex-row justify-between w-[100%]'
            >
                <GameGrid />
                <GameList />
            </div>

        </div>
    );
}
