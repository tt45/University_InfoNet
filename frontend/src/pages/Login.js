import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Button, ButtonToolbar, Container, Col, Row, Modal} from 'react-bootstrap';

import NavigationBarLogin from '../components/NavBarLogin';
import Section from '../components/Section';
import Banner from '../banner.jpg'

import styles from './Login.scss'

import 'font-awesome/css/font-awesome.min.css';
import {Link, withRouter, Redirect, BrowserRouter as Router} from 'react-router-dom';
import { push } from 'react-router-redux'
import axios from 'axios';
import Home from './Home.js';



class Login extends Component {
        constructor(props, context) {
          super(props, context);

          this.handleShowSign = this.handleShowSign.bind(this);
          this.handleCloseSign = this.handleCloseSign.bind(this);
          this.handleShowLogin = this.handleShowLogin.bind(this);
          this.handleCloseLogin = this.handleCloseLogin.bind(this);
          this.handleFormSubmit = this.handleFormSubmit.bind(this);
          this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

          this.state = {
            signupShow: false,
            loginShow: false,
            first: "",
            last: "",
            email: "",
            password: "",
            username: "",
            university: "",
            classStanding: "",
            major: "",
          };
        }
        handleCloseSign() {
          this.setState({signupShow: false });
        }
        handleShowSign() {
          this.setState({signupShow: true });
        }
        async handleFormSubmit(e){
          var first = this.inputF.value;
          var last = this.inputL.value;
          var email = this.email.value;
          //Check if email is a student email
          var split = email.split(".");
          var edu = split[split.length - 1];
          if(edu === "edu"){
            console.log("Success");
          }else{
            alert("ERROR: Not a Student Email!")
            return;
          }
          var password = this.pass.value;
          var username = this.user.value;
          var university= this.college.value;
          var classStanding=this.standing.value;
          var major =this.major.value;
          //Set the State
          //await this.setState({first: first, last: last, email: email, password: password, username:username, university: university, classStanding: classStanding,major:major}, () =>
            //  console.log(this.state)
          //)
          var accountObj;
          axios.post("http://127.0.0.1:4000/users/signup", {
                      email: email,
                      username: username,
                      password: password,
                      university: university,
                      firstName: first,
                      lastName: last,
                      major: major,
                      year: classStanding,
                      //expectedGraduation: "2019-04-23T12:05:36.000+00:00",
                  })
                  .then(function (response) {
                          //console.log(response);
                          accountObj = response["data"]["user"];
                          console.log(accountObj);

                  })
                  .catch(function (err) {
                          console.log(err);
                  })
                  //Debugging
          e.preventDefault()
          //return accountObj;

        }
        async handleLoginSubmit(e){
          var email = this.email2.value;
          var split = email.split(".");
          var edu = split[split.length - 1];
          //Check if the email is a student email
          if(edu === "edu"){
            console.log("Success");
          }else{
            alert("ERROR: Not a Student Email!")
            return;
          }
          var password = this.pass2.value;
          //this.setState({email: email,password:password}, () =>
            //console.log(this.state)
          //)
          var accountObj;

        //  return dispatch =>
          axios.post("http://127.0.0.1:4000/users/login", {
                      email: email,
                      password: password,
                      //expectedGraduation: "2019-04-23T12:05:36.000+00:00",
                  })
                  .then(function (response) {
                          //console.log(response)
                          accountObj = response["data"]["user"];
                          console.log(accountObj)
                          //dispatch(push('/home'))
                  })
                  .catch(function (err) {
                          console.log(err);
                  })
           e.preventDefault();
        }
        handleCloseLogin() {
          this.setState({loginShow: false });
        }
        handleShowLogin() {
          this.setState({loginShow: true });
        }

        render() {
                var secStyle = {
                  backgroundColor: "#efefef",
                  height: "300px",
                  justifyContent: "center",
                  paddingTop: "5%"
                };
                var infoStyle ={
                  display: "flex",
                  width: "60%",
                  marginLeft: "25%",
                  paddingBottom: "3%"
                };
                var colStyle = {
                  paddingTop: "5%",
                  width: "25%"
                };
                var para ={
                  textAlign: "left-align"
                };
                var pContainer = {
                  marginRight: "45%",
                  alignItems: "center"
                };
                var fbColors = {
                  color: "#3C5A99",
                };
                var twColors = {
                  color: "#1DA1F2",
                };
                var lnColors = {
                  color: "#0077B5",
                };
                var icon ={
                  padding: "10px",
                };
                var footer ={
                  height: "8vh",
                  backgroundColor: "black",
                  paddingTop: "0.5%",
                  textAlign: "center"
                };
                var row = {
                  display: "-webkit-inline-box"
                };
                var modalSign = {
                 position: "absolute",
                 top: "45%",
                 left: "50%",
                 color: "white",
                 backgroundColor: "blue",
                 fontSize: "16px",
                 padding: "12px 24px",
                 border: "none",
                 cursor: "pointer",
                 borderRadius: "5px",
                 transform: "translate(-50%, -50%)",
                 width: "10%"
                };
                var modalLogin = {
                 position: "absolute",
                 top: "55%",
                 left: "50%",
                 backgroundColor: "#555",
                 color: "white",
                 backgroundColor: "blue",
                 fontSize: "16px",
                 padding: "12px 24px",
                 border: "none",
                 cursor: "pointer",
                 borderRadius: "5px",
                 transform: "translate(-50%, -50%)",
                 width: "10%",

                };
                var loginForm = {
                  paddingLeft: "1%",
                };
                var signupForm = {
                  paddingLeft: "1%",
                };
                var FontAwesome = require('react-fontawesome');
                return (
                  <div className ="LoginPage">
                        <NavigationBarLogin/>
                        <div>
                          <img src={Banner} style = {styles.img} alt="Free Image of Network Nodes"/>
                          <Button variant="primary" onClick={this.handleShowSign} style={modalSign}>
                            Sign Up
                          </Button>
                          <Button variant="primary" onClick={this.handleShowLogin} style={modalLogin}>
                            Login
                          </Button>
                          <Modal show={this.state.signupShow} onHide={this.handleCloseSign}>
                              <Modal.Header closeButton>
                                <Modal.Title>Sign Up</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>Please fill out all the information</Modal.Body>
                              <Form style = {signupForm} onSubmit={this.handleFormSubmit}>
                                <Form.Group controlId="formFirstName">
                                  <Form.Label>First Name</Form.Label>
                                  <Form.Control type="text" placeholder="First Name" ref={fname=> (this.inputF= fname)}/>
                                </Form.Group>
                                <Form.Group controlId="formLastName">
                                  <Form.Label>Last Name</Form.Label>
                                  <Form.Control type="text" placeholder="Last Name" ref={lname=> (this.inputL=lname)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                  <Form.Label >Student Email address</Form.Label>
                                  <Form.Control type="email" placeholder="example@email.edu" ref={email=>this.email=email}/>
                                  <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                  </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control type="password" placeholder="Password" ref={pass => this.pass=pass}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicUsername">
                                  <Form.Label>Username</Form.Label>
                                  <Form.Control type="text" placeholder="Enter Username" ref ={user=>this.user=user}/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>University</Form.Label>
                                <Form.Control as="select" ref={college=>this.college=college}>
                                  <option>University of Illinois at Urbana-Champaign</option>
                                  <option>University of Southern California</option>
                                  <option>Purdue University</option>
                                  <option>Ohio State University</option>
                                  <option>University of Michigan at Ann Arbor</option>
                                </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect2">
                                  <Form.Label>Class Standing</Form.Label>
                                  <Form.Control as="select" ref={standing=>this.standing=standing}>
                                    <option>Freshman</option>
                                    <option>Sophomore</option>
                                    <option>Junior</option>
                                    <option>Senior</option>
                                    <option>Graduate</option>
                                  </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicMajor">
                                  <Form.Label>Major</Form.Label>
                                  <Form.Control type="text" placeholder="Enter Major" ref={major=> this.major=major} />
                                </Form.Group>
                                <Modal.Footer>
                                  <Button variant="secondary" onClick={this.handleCloseSign}>
                                    Close
                                  </Button>
                                  <Button variant="primary" type="submit" value="Submit">
                                    Sign Up
                                  </Button>
                                </Modal.Footer>
                              </Form>
                          </Modal>
                          <Modal show={this.state.loginShow} onHide={this.handleCloseLogin}>
                            <Modal.Header closeButton>
                              <Modal.Title>Login</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Please Login with your credentials</Modal.Body>
                            <Form style = {loginForm} onSubmit={this.handleLoginSubmit}>
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" ref={email2 => this.email2 = email2} />
                                <Form.Text className="text-muted">
                                  We'll never share your email with anyone else.
                                </Form.Text>
                              </Form.Group>
                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" ref={pass2 => this.pass2=pass2} />
                              </Form.Group>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleCloseLogin}>
                                  Close
                                </Button>
                                <Button variant="primary" type="submit" value="Submit">
                                  Login
                                </Button>
                              </Modal.Footer>
                            </Form>
                          </Modal>
                        </div>
                        <div style = {secStyle}>
                          <Section
                              title = "ABOUT US"
                              subtitle =
                              <p>We are an organization that helps students find the right resources based on the school that they are attending. <br/> We allow students to interact with each other and find out what is occurring on campus as well as in the city that they will be in.<br/>
                              The goal is to create a positive community where people with real questions can get real applicable answers. It helps students with the <br/> college experience and helps them be involved with the community that they will call home for the next few years.</p>
                              dark ={true}
                              id="about"
                            />
                        </div>
                        <div style={infoStyle}>
                          <Container id="info">
                            <Row>
                              <Col style={colStyle}>
                                <h4>Student Life</h4>
                                <div style={pContainer}>
                                  <p style={para}>We want students to connect with other students.</p>
                                </div>
                              </Col>
                              <Col style={colStyle}>
                                  <h4>Community</h4>
                                  <div style={pContainer}>
                                    <p style={para}>We want students to interact with the community.</p>
                                  </div>
                              </Col>
                              <Col style={colStyle}>
                                <h4>Healthy Life</h4>
                                <div style={pContainer}>
                                  <p style={para}>We want students to maintain a healthy lifestyle.</p>
                                </div>
                              </Col>
                            </Row>
                          </Container>
                        </div>
                        <div style={footer}>
                          <div style={row}>
                            <a href="http://facebook.com" style ={icon}>
                              <FontAwesome
                                className='super-crazy-colors'
                                name='facebook'
                                size='2x'
                                style={fbColors}
                              />
                            </a>
                            <a href="http://twitter.com" style={icon}>
                              <FontAwesome
                                className='super-crazy-colors'
                                name='twitter'
                                size='2x'
                                style={twColors}
                              />
                            </a>
                            <a href="http://linkedin.com" style={icon}>
                              <FontAwesome
                                className='super-crazy-colors'
                                name='linkedin'
                                size='2x'
                                style={lnColors}
                              />
                            </a>
                          </div>
                        </div>
                 </div>
                )
        }
}

export default Login;
