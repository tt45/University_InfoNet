import React, { Component } from 'react';
import {Card, Badge} from 'react-bootstrap';
import { FaThumbsUp } from "react-icons/fa";

import './PostItem.scss'

class PostItem extends Component {
        render() {
                return (
                        <Card>
                          <Card.Body>
                            <div className='content_body'>
                            <Card.Title>Post Title</Card.Title>
                            <Card.Text>
                              This is test content to indicate where content will actually show up
                            </Card.Text>
                            </div>
                            <div className='other_info'>
                                <Badge className='tag_name' variant="secondary">Tag</Badge>
                                <div className='like_post'>
                                    <FaThumbsUp/>
                                    <p className='like_number'>135</p>
                                </div>
                            </div>
                          </Card.Body>

                        </Card>
                )
        }
}

export default PostItem;
