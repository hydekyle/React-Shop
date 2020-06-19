import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

const MainBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" light expand="md" dark={true}>
                <NavbarBrand href="/">Mistery Games</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Juegos
              </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href="/sor">
                                    SoR Game
                </DropdownItem>
                                <DropdownItem href="/elmisteriodelaoscuridad">
                                    El Misterio de la Oscuridad
                </DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <NavLink href="https://github.com/hydekyle" preload="true" target="_blank" >GitHub</NavLink>
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
