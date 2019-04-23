import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { FaUser } from "react-icons/fa";

import './NavBar.scss'

class NavigationBar extends Component {
        render() {
                return (
                        <Navbar bg="dark" variant="dark" sticky='top'>
                          <Navbar.Brand href="/Home">InfoNet</Navbar.Brand>
                          <Navbar.Toggle aria-controls="basic-navbar-nav" />
                          <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                            <NavDropdown title={<FaUser/>} className="dropDown" id="collasible-nav-dropdown" alignRight>
                                <NavDropdown.Item href="action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                              </NavDropdown>
                            </Nav>
                          </Navbar.Collapse>
                        </Navbar>
                )
        }
}

export default NavigationBar;
