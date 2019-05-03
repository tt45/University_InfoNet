import React, { Component } from 'react';
import {Card, Badge} from 'react-bootstrap';
import { FaThumbsUp } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from "react-redux";

import './PostItem.scss'

class PostItem extends Component {

        render() {
                const {user, post} =this.props;
                return (
                        <Card>
                          <LinkContainer to={{pathname: `posts/${post._id}`, state: {user: user, post: post}}}>
                          <Card.Body>
                            <div className='content_body'>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>
                              {post.context}
                            </Card.Text>
                            </div>
                            <div className='other_info'>
                                <Badge className='tag_name' variant="secondary">{post.category}</Badge>
                                <div className='like_post'>
                                    <FaThumbsUp style={(user.likes.includes(post._id))?{color: 'orange'}:{color: 'black'}}/>
                                    <p className='like_number'>{post.likeCount}</p>
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
