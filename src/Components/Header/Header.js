import React from 'react';
import './Header.css';
import header from '../Images/Image/header.png';
import logo from '../Images/Icon/Logo.png'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { HiArrowRight } from "react-icons/hi";



const Header = () => {
    return (
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0.1, 0.1, 0.1) ), url(${header})` }} className="header">
            <nav className="nav">
                <ul>
                    <li>
                        <img className="logo" src={logo} alt="" />
                    </li>
                    <li>
                        <input type="text" placeholder="  Search your Destination"/>
                    </li>

                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/news">News</Link>
                    </li>
                    <li>
                        <Link to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link to="/contact">contact</Link>
                    </li>
                    <li>
                        <Link to="/book">Book Now</Link>
                    </li>
                    <li>
                        <Link to="/login">
                            <Button variant="contained"     color="secondary">
                            Login <HiArrowRight/>
                            </Button>
                        </Link>
                    </li>

                </ul>
            </nav>
            


        </div>
    );
};

export default Header;