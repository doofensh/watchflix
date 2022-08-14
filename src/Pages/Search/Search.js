import React from 'react'
import axios from 'axios'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import "./Search.css";
// import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
// import { createTheme, ThemeProvider } from '@mui/system';

const Search = () => {

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    // const darkTheme = createTheme({
    //     palette: {
    //         type: "dark",
    //         primary: {
    //             main: "#fff",
    //         },
    //     },
    // });

    const fetchSearch = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=658a147237a83583b2f1a3512e81784d&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );

        setContent(data.results);
        setNumOfPages(data.total_pages);
        // console.log(data);       
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    return (
        <div>
            {/* <ThemeProvider theme={darkTheme}> */}
            {/* <div style={{ display: "flex", margin: "15px 0" }}> </div>*/}
                <span className="pageTitle">Search</span>


                <div className="search" style={{ display: "flex", margin: "15px 0" }}>
                    <TextField
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        style={{ marginLeft: 10 }}
                        onClick={fetchSearch}
                    >
                        <SearchIcon fontSize="large" />
                    </Button>
                </div>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    style={{ paddingBottom: 5 }}
                // aria-label="disabled tabs example"
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>

            {/* </ThemeProvider> */}

            <div className="trending">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}
                        />
                    ))}
                {searchText &&
                    !content &&
                    (type ? <h5>No Series Found</h5> : <h4>No Movies Found</h4>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}

        </div>
    );
};

export default Search;