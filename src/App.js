import React from 'react';
// import Cards from './Cards';
// import series from "./series";

import './App.css';
import Header from './components/Header';
import { Container } from '@mui/system';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SimpleBottomNavigation from './components/MainNav';


const App = () => {
    return (
        <>
            {/* {series.map((val) => {
                return (
                    <Cards
                        name={val.name}
                        img={val.img}
                        link={val.link}
                    />
                );
            })} */}

            <BrowserRouter>
                <Header />
                <div className='app'>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Trending />} exact />
                            <Route path="/movies" element={<Movies />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/series" element={<Series />} />
                        </Routes>
                    </Container>
                </div>
                <SimpleBottomNavigation />
            </BrowserRouter >
        </>
    );
}

export default App;