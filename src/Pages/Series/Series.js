import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import './Series.css'
import Genres from '../../components/Genres';
import useGenres from '../../MovieHooks/useGenres';

const Series = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPage, setNumPages] = useState(1);

    const[selectedGenres, setSelectedGenres] = useState([]);
    const[genres, setGenres] = useState([]);

    const genreforURL = useGenres(selectedGenres);

    const fetchTvSeries = async () => {

        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=658a147237a83583b2f1a3512e81784d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`)

        setContent(data.results);
        setNumPages(data.total_pages);
        //  console.log(data);
    }
    useEffect(() => {
        window.scroll(0, 0);
        fetchTvSeries();
        // eslint-disable-next-line
    }, [page, genreforURL]);
    return (
        <>
            <div>
                <div className="pageTitle">Series</div>
                <Genres
                    type="tv"
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    genres={genres}
                    setGenres={setGenres}
                    setPage={setPage}
                />
                <div className='trending'>
                    {
                        content && content.map((c) =>
                            <div className="trending">
                                {content &&
                                    content.map((c) => (
                                        <SingleContent
                                            key={c.id}
                                            id={c.id}
                                            poster={c.poster_path}
                                            title={c.title || c.name}
                                            date={c.first_air_date || c.release_date}
                                            media_type="tv"
                                            vote_average={c.vote_average}
                                        />
                                    ))}
                            </div>
                        )
                    }
                </div>
                {
                    numOfPage > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPage} />)
                }

            </div>
        </>
    )
}

export default Series