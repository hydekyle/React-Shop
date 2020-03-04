import React, { useContext, useState } from 'react'
import {MainContext} from '../../Context/MainContext'
import { 
    Button, 
    CardBody,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'

export default () => {
    const [isOpen, setIsOpen] = useState(false)
    const context = useContext(MainContext)
    return (
        <div>
            <Navbar dark={true}>
            <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
            <NavbarBrand href="/">Tazas Locas</NavbarBrand>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/login">Login</NavLink>
                        <NavLink href="/shop">Shop</NavLink>
                    </NavItem>
                </Nav>
                <CardBody>{context?.counter}</CardBody>
            </Collapse>
            </Navbar>
            
        </div>
    )
}
