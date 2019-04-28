import React, { Component } from 'react';
import {Card, Badge} from 'react-bootstrap';
import { FaThumbsUp } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from "react-redux";

import './PostItem.scss'

class PostItem extends Component {
        render() {
                const {user} =this.props;
                return (
                        <Card>
                          <LinkContainer to={`posts/${this.props._id}`}>
                          <Card.Body>
                            <div className='content_body'>
                            <Card.Title>{this.props.title}</Card.Title>
                            <Card.Text>
                              {this.props.context}
                            </Card.Text>
                            </div>
                            <div className='other_info'>
                                <Badge className='tag_name' variant="secondary">{this.props.category}</Badge>
                                <div className='like_post'>
                                    <FaThumbsUp style={(user._id===this.props.postedBy)?{color: 'black'}:{color: 'blue'}}/>
                                    <p className='like_number'>{this.props.likeCount}</p>
                                </div>
                            </div>
                          </Card.Body>
                          </LinkContainer>

                        </Card>
                )
        }
}
function mapStateToProps(state) {
        return {
                user: state.userReducer.user,
        }
}

export default connect(mapStateToProps)(PostItem);
