import React from 'react'
import "./header.css"
// import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>

            <div className='head'>
                <span className='header'>MeraFlix</span>
            </div>
            {/* <div >

                <ul className='bottomnav'>
                    <li className='ml-6'><Link to="/">Trending</Link></li>
                    <li className='ml-6'> <Link to="/movies">Movies</Link></li>
                    <li className='ml-6'> <Link to="/search">Search</Link></li>
                    <li className='ml-6'> <Link to="/series">Series</Link></li>
                </ul>
            </div> */}
        </>
    )
}

export default Header;