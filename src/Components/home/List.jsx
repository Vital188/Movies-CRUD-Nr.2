import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import Home from "../../Contexts/Home";
import Line from './Line';

const sortData = [
    { v: 'default', t: 'Default' },
    { v: 'price_asc', t: 'Price 1-9' },
    { v: 'price_desc', t: 'Price 9-1' },
    { v: 'rate_asc', t: 'Rating 1-9' },
    { v: 'rate_desc', t: 'Rating 9-1' }
];

function List() {

    const { movies, setMovies, filterOn, filterWhat } = useContext(Home);

    const [sortBy, setSortBy] = useState('default');
    const [stats, setStats] = useState({movieCount: null});

    const resetFilter = () => {
        setMovies(m => m.map(mo => ({ ...mo, show: true })));
        filterOn.current = false;
        filterWhat.current = null;
    }

    useEffect(() => {
        if (null === movies) {
            return;
        }
        setStats(s => ({...s, movieCount: movies.length}));
    }, [movies]);

    useEffect(() => {
        switch (sortBy) {
            case 'price_asc':
                setMovies(m => [...m].sort((a, b) => a.price - b.price));
                break;
            case 'price_desc':
                setMovies(m => [...m].sort((b, a) => a.price - b.price));
                break;
            case 'rate_asc':
                setMovies(m => [...m].sort((x, c) => x.rating - c.rating));
                break;
            case 'rate_desc':
                setMovies(m => [...m].sort((jo, no) => no.rating - jo.rating));
                break;
            default:
                setMovies(m => [...m ?? []].sort((a, b) => a.row - b.row));
        }

    }, [sortBy, setMovies]);

    return (
        <>
            <div className="card m-4">
                <h5 className="card-header">Sort</h5>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Sort By</label>
                        <select className="form-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            {
                                sortData.map(c => <option key={c.v} value={c.v}>{c.t}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="card m-4">
                <h5 className="card-header">Movies List ({stats.movieCount}) <small onClick={resetFilter}>show all cats</small></h5>
                <div className="card-body">
                    <ul className="list-group">
                        {
                            movies?.map(m => m.show ? <Line key={m.id} movie={m} /> : null)
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default List;