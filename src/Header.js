import React, {useState} from 'react';
import {Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from "react-router-dom";


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar className={'mb-2'} color="dark" dark expand="lg">
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link className={'nav-link'} to="/">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link className={'nav-link'} to="/analysis/">Analyze Text</Link>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default Header;