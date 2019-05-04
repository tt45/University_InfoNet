import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { connect } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';

import { FaUser } from "react-icons/fa";

import './NavBar.scss'

class NavigationBar extends Component {

        componentDidMount() {
                console.log(this.props);
        }

        render() {
                return (
                        <Navbar bg="dark" variant="dark" sticky='top'>
                        { !this.props.loggedIn &&
                          <LinkContainer to='/'>
                          <Navbar.Brand>InfoNet</Navbar.Brand>
                          </LinkContainer>
                        }
                         {this.props.loggedIn &&
                         <React.Fragment>
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
                                <LinkContainer to={'/likePosts'}>
                                <NavDropdown.Item >Liked</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to={'/ownPosts'}>
                                <NavDropdown.Item >Own Posts</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to={'/profile'} exact>
                                        <NavDropdown.Item >Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                              </NavDropdown>
                            </Nav>
                            
                          </Navbar.Collapse>
                          </React.Fragment> }
                        </Navbar>
                )
        }
}

function mapStateToProps(state) {
        return {
                loggedIn: state.userReducer.loggedIn,
        }
}

export default connect(mapStateToProps)(NavigationBar);
