import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { connect } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';

import { FaUser } from "react-icons/fa";

import './NavBar.scss'

class NavigationBar extends Component {
        render() {
                return (
                        <Navbar bg="dark" variant="dark" sticky='top'>
                          <LinkContainer to='/home'>
                          <Navbar.Brand>InfoNet</Navbar.Brand>
                          </LinkContainer>
                          <Navbar.Toggle aria-controls="basic-navbar-nav" />
                          <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                            <NavDropdown title={<FaUser/>} className="dropDown" id="collasible-nav-dropdown" alignRight>

                                <LinkContainer to={'/CreatePost'}>
                                        <NavDropdown.Item href="createPost">Create Post</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item href="action/3.2">Liked</NavDropdown.Item>
                                <NavDropdown.Item href="action/3.3">Own Posts</NavDropdown.Item>
                                <LinkContainer to={'/profile'} exact>
                                        <NavDropdown.Item >Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
                              </NavDropdown>
                            </Nav>
                          </Navbar.Collapse>
                        </Navbar>
                )
        }
}

export default connect()(NavigationBar);
