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
                             <Form.Control plaintext readOnly defaultValue={user.firstName} />
                           </Col>
                         </Form.Group>

                         <Form.Group as={Row} controlId="formPlaintextEmail">
                           <Form.Label column sm="2">
                             Last Name:
                           </Form.Label>
                           <Col sm="10">
                             <Form.Control plaintext readOnly defaultValue={user.lastName} />
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
