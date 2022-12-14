import Comment from "../../Contexts/Comment";
import List from "./List";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import DataContext from "../../Contexts/DataContext";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [movies, setMovies] = useState(null);
    const [comment, setComment] = useState(null);
    const { makeMsg } = useContext(DataContext);

    const reList = data => {
        const d = new Map();
        data.forEach(line => {
            if (d.has(line.title)) {
                d.set(line.title, [...d.get(line.title), line]);
            } else {
                d.set(line.title, [line]);
            }
        });
        return [...d];
    }

    // READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/server/movies/wc', authConfig())
            .then(res => {
                setMovies(reList(res.data));
            })
    }, [lastUpdate]);

    useEffect(() => {
        if (null === comment) {
            return;
        }
        axios.delete('http://localhost:3003/server/comments/' + comment.id, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            })
    }, [comment, makeMsg]);

    return (
        <Comment.Provider value={{
            setComment,
            movies
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <List />
                    </div>
                </div>
            </div>
        </Comment.Provider>
    );
}

export default Main;