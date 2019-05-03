import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import { connect } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';

import {createPost} from '../action/postAction';

import './CreatePost.scss';

class CreatePost extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        title:'',
                        category:'',
                        context:'',
                }
                this.handleSubmit = this.handleSubmit.bind(this);
        }


        handleSubmit() {
                console.log(this.inputTitle.value, this.inputCategory.value, this.inputContext.value);
                this.props.dispatch(createPost(this.props.user._id, this.inputTitle.value, this.inputCategory.value, this.inputContext.value));
        }

        render() {
                return (
                        <Form className="create_post_form">
                          <div className="post_content">
                                  <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control ref={el => this.inputTitle = el} />
                                  </Form.Group>
                                  <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control ref={el => this.inputCategory = el} as="select">
                                      <option>Food</option>
                                      <option>Housing</option>
                                      <option>Events</option>
                                      <option>Health</option>
                                      <option>Course</option>
                                      <option>Miscellaneous</option>
                                    </Form.Control>
                                  </Form.Group>
                                  <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Context</Form.Label>
                                    <Form.Control ref={el => this.inputContext = el} as="textarea" rows="5" />
                                  </Form.Group>
                          </div>
                          <LinkContainer to={'/home'}>
                                  <div>
                                  <Button className="submit_post" as="input" type="submit" value="Submit" onClick={this.handleSubmit}/>
                                  </div>
                          </LinkContainer>
                        </Form>
                )
        }
}

function mapStateToProps(state) {
        return {
                user: state.userReducer.user,
        }
}

export default connect(mapStateToProps)(CreatePost);
