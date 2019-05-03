import React, { Component } from 'react';
import {Card, Badge, Form, Button} from 'react-bootstrap';
import { connect } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";

import {fetchPost, submitCommentToPost, likePost, unlikePost, deleteComment} from '../action/detailAction';
import {fetchUser} from '../action/userAction';
import './PostDetail.scss'

class PostDetail extends Component {
        constructor(props) {
                super(props);
                const {user, post}= this.props.location.state;
                console.log((user.likes.includes(post._id)));
                this.state = {
                        input: '',
                        like_button_color: (user.likes.includes(post._id))?"orange":"black",
                        like_count: post.likeCount,
                        liked: (user.likes.includes(post._id)),
                }
                this.inputChange = this.inputChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
                this.likePost = this.likePost.bind(this);
        }

        async componentDidMount() {
                console.log(this.props.location.state)
                const post_id = this.props.location.state.post._id;
                await this.props.dispatch(fetchPost(post_id));

        }

        inputChange(event) {
                this.setState({input: event.target.value});
        }


        handleSubmit() {
                this.inputContext.value = "";
                const {user, post}= this.props.location.state;
                this.props.dispatch(submitCommentToPost(this.state.input, user._id, post._id));
        }

        likePost() {
                const {user, post}= this.props.location.state;
                if (this.state.liked) {
                        this.setState({like_button_color: 'black', like_count: this.state.like_count-1, liked: false});
                        this.props.dispatch(unlikePost(post._id, user._id));
                } else {
                        this.setState({like_button_color: 'orange', like_count: this.state.like_count+1, liked: true});
                        this.props.dispatch(likePost(post._id, user._id));
                }
        }

        deleteComment(comment_id) {
                console.log(comment_id);
                const {user, post}= this.props.location.state;
                this.props.dispatch(deleteComment(post._id, comment_id));
        }

        render() {
                const comments = this.props.comments;
                const {user, post}= this.props.location.state;
                console.log(user, post, comments);
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
                                        {post.postedByUserName}
                                      </footer>
                                    </blockquote>
                                    <div className='other_info'>
                                        <Badge className='tag_name' variant="secondary">{post.category}</Badge>
                                        <div className='like_post' onClick={this.likePost}>
                                            <FaThumbsUp style={{color: this.state.like_button_color}}/>
                                            <p className='like_number'>{this.state.like_count}</p>
                                        </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                                {comments.map(comment =>
                                  <Card key={comment._id} border="info">
                                    <Card.Header className="CommentHeader">Commented By: {comment.commentedByUserName}
                                        {(comment.commentedBy===user._id) &&
                                                <Button className="delete_button" variant="danger" as="input" value="Delete" onClick={()=>this.deleteComment(comment._id)}/>
                                        }
                                    </Card.Header>
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
                comments: state.detailReducer.comments,

        }
}

export default connect(mapStateToProps)(PostDetail);
