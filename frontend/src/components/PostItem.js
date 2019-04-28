import React, { Component } from 'react';
import {Card, Badge} from 'react-bootstrap';
import { FaThumbsUp } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';

import './PostItem.scss'

class PostItem extends Component {
        render() {
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
                                    <FaThumbsUp/>
                                    <p className='like_number'>{this.props.likeCount}</p>
                                </div>
                            </div>
                          </Card.Body>
                          </LinkContainer>

                        </Card>
                )
        }
}

export default PostItem;
