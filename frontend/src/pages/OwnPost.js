import React, { Component } from 'react';
import { connect } from "react-redux";

import PostItem from '../components/PostItem';

import {fetchOwnPost} from '../action/userAction';

class OwnPost extends Component {

        componentDidMount() {
                this.props.dispatch(fetchOwnPost(this.props.user._id));
        }

        render () {
                const own_posts = this.props.own_posts;
                return (
                        <div className="own_posts">
                        {own_posts.map((post)=>
                                <PostItem key={post._id} post={post}/>)}
                        </div>
                )
        }
}

function mapStateToProps(state) {
        return {
                user: state.userReducer.user,
                own_posts: state.userReducer.own_posts,
                loggedIn: state.userReducer.loggedIn,
        }
}

export default connect(mapStateToProps)(OwnPost);
