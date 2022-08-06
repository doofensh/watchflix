import React from 'react'
import axios from 'axios';

import { useState, useEffect } from 'react';
import SingleContent from '../../components/SingleContent/SingleContent';
//import './Trending.css'
import CustomPagination from '../../components/Pagination/CustomPagination';

const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1)
    const fetchTrending = async () => {
        // const { data } = await axios.get(
        //     `https://api.themoviedb.org/3/trending/all/day?api_key=658a147237a83583b2f1a3512e81784d&page=${page}`
        // );
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=658a147237a83583b2f1a3512e81784d&page=${page}`
        );
        console.log("hello");
        //     console.log(data);
        setContent(data.results);
    };

    useEffect(() => {

        fetchTrending();
    // eslint-disable-next-line
    }, [page]);
    return (
        <>
            <span className='pageTitle'>Trendings</span>
            <div className='trending'>
                {
                    content && content.map((c) =>
                        <SingleContent key={c.id} id={c.id}
                            poster={c.poster_path} title={c.title || c.name}
                            data={c.first_air_date || c.release_date} media_type={c.media_type}
                            vote_average={c.vote_average}
                        />
                    )
                }
            </div>
            <CustomPagination setPage={setPage} />
        </>
    )
}

export default Trending
