import React, { Component } from 'react';
import { connect } from "react-redux";

import PostItem from '../components/PostItem';

class OwnPost extends Component {

        componentDidMount() {

        }

        render () {
                const (user, post) = this.props;
                return (
                        {posts.map((post)=>
                                <PostItem key={post._id} post={post}/>)}
                )
        }
}

function mapStateToProps(state) {
        return {
                user: state.userReducer.user;
        }
}

export default connect(mapStateToProps)(OwnPost);
