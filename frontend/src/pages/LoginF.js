import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import { connect } from "react-redux";

import {logIn} from '../action/userAction';

class LoginF extends Component {
        constructor(props) {
                super(props);
                this.state={
                        email: '',
                        password: ''
                }
                this.inputEmail = this.inputEmail.bind(this);
                this.inputPassword = this.inputPassword.bind(this);
                this.handleLogin = this.handleLogin.bind(this);
        }


        inputEmail(event) {
                this.setState({email: event.target.value});
        }

        inputPassword(event) {
                this.setState({password: event.target.value});
        }

        handleLogin() {
                console.log('got here');
                this.props.dispatch(logIn(this.state.email, this.state.password));
        }

        render() {

                return (
                        <Form>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.inputEmail}/>
                            <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                            </Form.Text>
                          </Form.Group>

                          <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.inputPassword}/>
                          </Form.Group>
                          <Form.Group controlId="formBasicChecbox">
                            <Form.Check type="checkbox" label="Check me out" />
                          </Form.Group>
                          <Button variant="primary" onClick={this.handleLogin}>
                            Submit
                          </Button>
                        </Form>
                )
        }
}

function mapStateToProps(state) {
        return {
                user: state.userReducer.user,
        }
}


export default connect()(LoginF);
