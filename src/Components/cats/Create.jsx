import { useState, useContext } from 'react';
import Cats from '../../Contexts/Cats';

function Create() {

    const [title, setTitle] = useState('');
    const { setCreateData } = useContext(Cats);

    const add = () => {
        setCreateData({
            title
        });
        setTitle('');
    }

    return (
        <div className="card m-4">
            <h5 className="card-header">New Cat</h5>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Cat Title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>
    );
}

export default Create;