import React, { useContext } from 'react';
import logo from '../Images/Icon/Logo.png'
import Button from '@material-ui/core/Button';
import { HiArrowRight } from "react-icons/hi";
import { UserContext } from '../../App';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';




const Header = () => {
    const [loggedInUser] = useContext(UserContext);
    return (
        <div className="container">
            <Navbar variant="primary">
                <Navbar.Brand href="#home"><img src={logo} alt="" width="200px" /></Navbar.Brand>
                <Nav className="mr-auto" style={{fontWeight: 'bold'}}>
                    <Nav.Link href="/home" >Home</Nav.Link>
                    <Nav.Link href="/news" >News</Nav.Link>
                    <Nav.Link href="/contact" >Contact</Nav.Link>
                    <Nav.Link href="/book" >
                        <Button variant="contained" color="primary">
                            Book Now <HiArrowRight />
                        </Button>
                    </Nav.Link>
                    <Nav.Link href="/Login" >
                        {
                            loggedInUser.isSignedIn ? <Button variant="contained" color="primary">
                                Log-out <HiArrowRight />
                            </Button> :
                                <Button variant="contained" color="secondary">
                                    Login <HiArrowRight />
                                </Button>
                        }

                    </Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search destination" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar>
        </div>





    );
};

export default Header;