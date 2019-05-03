import axios from 'axios';
import {fetchPosts} from './postAction';

export function fetchPost(post_id) {
        var request_arr = ["http://127.0.0.1:4000/posts/"+post_id, "http://127.0.0.1:4000/comments/post/"+post_id]
        return dispatch => {
                Promise.all(
                        request_arr.map(request=>
                                        axios.get(request)
                                        .then(function(response) {
                                                return response.data
                                        })
                                        .catch(function(err) {
                                                console.log(err);
                                        })
                        )
                )
                .then(responses => {
                        console.log(responses);
                        dispatch(fetchPostSuccess(responses[0].data, responses[1].data));
                })
                .catch(err => console.log(err))
        }
}

export function submitCommentToPost(input, user_id, post_id) {
        return dispatch => {
                axios.post("http://127.0.0.1:4000/comments/post", {
                        postId: post_id,
                        context: input,
                        commentedBy: user_id,
                })
                .then(function (response){
                        dispatch(fetchPost(post_id));
                })
                .catch(function (err) {
                        console.log(err);
                })
        }
}

export function likePost(post_id, user_id) {
        return dispatch => {
                axios.post("http://127.0.0.1:4000/posts/like", {
                        postId: post_id,
                        userId: user_id
                })
                .then(function (response){
                        console.log(response);
                        dispatch(fetchPosts());
                })
                .catch(function (err) {
                        console.log(err);
                })
        }
}

export function unlikePost(post_id, user_id) {
        return dispatch => {
                axios.post("http://127.0.0.1:4000/posts/unlike", {
                        postId: post_id,
                        userId: user_id
                })
                .then(function (response){
                        console.log(response);
                        dispatch(fetchPosts());
                })
                .catch(function (err) {
                        console.log(err);
                })
        }
}

export function deleteComment(post_id, comment_id) {
        return dispatch => {
                axios.delete("http://127.0.0.1:4000/comments/"+comment_id, {

                })
                .then(function (response){
                        console.log(response);
                        dispatch(fetchPost(post_id));
                })
                .catch(function (err) {
                        console.log(err);
                })
        }
}

export const fetchPostSuccess = (post, comments) => ({
        type: "FETCH_POST_SUCCESS",
        payload: { post, comments }
});

export const fetchPostFailure = error => ({
        type: "FETCH_POST_FAILURE",
        payload: { error }
});
