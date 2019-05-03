import React, { Component } from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import { connect } from "react-redux";

import './ProfileForm.scss';

class ProfileForm extends Component {

        render() {
                const {user} = this.props;
                return (
                        <Form className='profile_form'>
                         <Form.Group as={Row} controlId="formPlaintextEmail">
                           <Form.Label column sm="2">
                             First Name:
                           </Form.Label>
                           <Col sm="10">
                             <Form.Control plaintext readOnly defaultValue={user.firstname} />
                           </Col>
                         </Form.Group>

                         <Form.Group as={Row} controlId="formPlaintextEmail">
                           <Form.Label column sm="2">
                             Last Name:
                           </Form.Label>
                           <Col sm="10">
                             <Form.Control plaintext readOnly defaultValue={user.lastname} />
                           </Col>
                         </Form.Group>

                          <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                              Email:
                            </Form.Label>
                            <Col sm="10">
                              <Form.Control plaintext readOnly defaultValue={user.email} />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                              University:
                            </Form.Label>
                            <Col sm="10">
                              <Form.Control plaintext readOnly defaultValue={user.university} />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                              Major:
                            </Form.Label>
                            <Col sm="10">
                              <Form.Control plaintext readOnly defaultValue={user.major} />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                              Password:
                            </Form.Label>
                            <Col sm="10">
                              <Form.Control type="password" placeholder="Password" />
                            </Col>
                          </Form.Group>
                          <Button className='submit_button' as="input" type="submit" value="Submit" />
                        </Form>
                )
        }
}

function mapStateToProps(state) {
        return {
                user: state.userReducer.user
        }
}

export default connect(mapStateToProps)(ProfileForm);
