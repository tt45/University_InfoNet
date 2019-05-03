import React, { Component } from 'react';
import { connect } from "react-redux";

import PostItem from '../components/PostItem';

import {fetchLikePost, fetchUser} from '../action/userAction';

class LikedPost extends Component {

        componentDidMount() {
                this.props.dispatch(fetchLikePost(this.props.user._id));
                this.props.dispatch(fetchUser(this.props.user._id));
        }

        render () {
                console.log(this.props.like_posts);
                const like_posts = this.props.like_posts;
                return (
                        <div className="like_posts">
                        {like_posts.map((post)=>
                                <PostItem key={post._id} post={post}/>)}
                        </div>
                )


        }
}

function mapStateToProps(state) {
        return {
                user: state.userReducer.user,
                loggedIn: state.userReducer.loggedIn,
                like_posts: state.userReducer.like_posts,
        }
}

export default connect(mapStateToProps)(LikedPost);
