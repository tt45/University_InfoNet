import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link, animateScroll as scroll } from "react-scroll";

import './NavBar.scss'

class NavigationBarLogin extends Component {
        render() {
          var Scroll = require('react-scroll');
          var scroll = Scroll.animateScroll;
          scroll.scrollToTop();

                return (
                  <Navbar bg="dark" variant="dark" sticky='top'>
                    <Link
                      onClick = {scroll.scrollToTop}
                      >
                      <Navbar.Brand>InfoNet</Navbar.Brand>
                    </Link>
                    <div class="navbar-nav justify-content-right">
                      <Link
                        activeClass="active"
                        to="about"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                      >
                        <a class="nav-item nav-link">About</a>
                      </Link>

                    </div>
                  </Navbar>
                )
        }
}

export default NavigationBarLogin;
