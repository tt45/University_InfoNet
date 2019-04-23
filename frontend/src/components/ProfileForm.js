import React, { Component } from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';


import './ProfileForm.scss'

class ProfileForm extends Component {
        render() {
                return (
                        <Form className='profile_form'>
                          <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                              Email:
                            </Form.Label>
                            <Col sm="10">
                              <Form.Control plaintext readOnly defaultValue="email@example.com" />
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

export default ProfileForm;
