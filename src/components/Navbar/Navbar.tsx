import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import './Navbar.css'

const MainBar = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="navbar-div">
            <Navbar color="dark" light expand="md" dark={true} className="navbar-head">
                <NavbarBrand href="/">Mistery Games</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/" >Juegos</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/hydekyle" target="_blank" >GitHub</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="mailto:hydekyle@hotmail.com">Contacto</NavLink>
                        </NavItem>
                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    );
}

export default MainBar;
