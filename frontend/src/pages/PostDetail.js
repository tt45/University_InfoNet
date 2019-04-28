import React, { Component } from 'react';
import {Card, Badge} from 'react-bootstrap';
import { connect } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";

import {fetchPost, fetchPostComment} from '../action/detailAction'
import './PostDetail.scss'

class PostDetail extends Component {

        async componentDidMount() {
                const post_id = this.props.match.params.post_id;
                await this.props.dispatch(fetchPost(post_id));
                await this.props.dispatch(fetchPostComment(this.props.post.comments));
        }

        render() {
                const {post, user, comments} = this.props;
                console.log(comments, 'post comments')
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
                                {user.username}
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
                        {comments.map((comment) =>
                                <p>{comment.context}</p>)}
                        </div>
                )
        }
}

function mapStateToProps(state) {
        console.log(state);
        return {
                post: state.detailReducer.post,
                user: state.userReducer.user,
                comments: state.detailReducer.comments,
        }
}

export default connect(mapStateToProps)(PostDetail);
