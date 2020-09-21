import React, { useContext } from 'react';
import './Header.css';
import logo from '../Images/Icon/Logo.png'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { HiArrowRight } from "react-icons/hi";
import { UserContext } from '../../App';




const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div >
            
            <nav className="nav">
                <ul>
                    <li>
                        <img className="logo" src={logo} alt="" width="200px"  />
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


                            {
                                loggedInUser.isSignedIn ? <Button variant="contained"     color="primary">
                                Log-out <HiArrowRight/>
                                </Button> :
                                <Button variant="contained"     color="secondary">
                            Login <HiArrowRight/>
                            </Button>
                            }


                        </Link>
                    </li>

                </ul>
            </nav>
            
            


        </div>
    );
};

export default Header;