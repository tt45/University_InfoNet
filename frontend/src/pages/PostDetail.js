import React, { Component } from 'react';
import {Card, Badge, Form, Button} from 'react-bootstrap';
import { connect } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";

import {fetchPost, submitCommentToPost} from '../action/detailAction'
import './PostDetail.scss'

class PostDetail extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        input: '',
                }
                this.inputChange = this.inputChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
        }


        inputChange(event) {
                this.setState({input: event.target.value});
        }


        handleSubmit() {
                this.inputContext.value = "";
                this.props.dispatch(submitCommentToPost(this.state.input, this.props.user._id, this.props.post._id));
        }

        async componentDidMount() {
                const post_id = this.props.match.params.post_id;
                await this.props.dispatch(fetchPost(post_id));
        }

        render() {
                const {post, comments} = this.props;
                console.log(post, comments)
                return (
                        <div className='postDetail'>
                                <Card>
                                  <Card.Header>{post.title}</Card.Header>
                                  <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                      <p>
                                        {' '}
                                        {post.context}{' '}
                                      </p>
                                      <footer className="blockquote-footer">
                                        {post.postedBy}
                                      </footer>
                                    </blockquote>
                                    <div className='other_info'>
                                        <Badge className='tag_name' variant="secondary">{post.category}</Badge>
                                        <div className='like_post'>
                                            <FaThumbsUp/>
                                            <p className='like_number'>{post.likeCount}</p>
                                        </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                                {comments.map(comment =>
                                  <Card key={comment._id} border="info">
                                    <Card.Header className="CommentHeader">Commented By: {comment.commentedBy}</Card.Header>
                                    <Card.Body>
                                      <Card.Text>
                                        {comment.context}
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>)}
                                  <div className="comment_section">
                                          <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Comment:</Form.Label>
                                            <Form.Control ref={el => this.inputContext = el} as="textarea" rows="3" onChange={this.inputChange}/>
                                          </Form.Group>
                                          <Button className="submit_comment" as="input" type="submit" value="Submit" onClick={this.handleSubmit}/>
                                  </div>
                        </div>
                )
        }
}

function mapStateToProps(state) {
        console.log(state);
        return {
                post: state.detailReducer.post,
                comments: state.detailReducer.comments,
                user: state.userReducer.user,
        }
}

export default connect(mapStateToProps)(PostDetail);
