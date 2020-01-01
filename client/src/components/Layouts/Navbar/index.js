import React from 'react';
import './navbar.scss';
import {ReactComponent as SearchIcon} from '../../../assets/icons/search-solid.svg';
import {Link} from "react-router-dom";

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark  fixed-top shadow">
            <div className='container-fluid'>
                <Link className="navbar-brand" to="/">Mern-Blog</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={'/recent'} className='nav-link'>Recent</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/categories'} className='nav-link'>Categories</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 search-box-container">
                        <input className="form-control mr-sm-2 search-box" type="search" placeholder="Search"
                               aria-label="Search"/>
                        <SearchIcon className='search-icon'/>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;