import Banner from '../common/Banner';
import SportList from '../common/SportList';
import MatchList from '../common/MatchList';

export default function Client1Home() {

    return (
        <div className="p-6">
            <Banner />
            <SportList />
            <MatchList />
        </div>
    );
}
