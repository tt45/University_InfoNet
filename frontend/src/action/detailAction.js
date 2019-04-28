import axios from 'axios';

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
                .then(responses =>
                        dispatch(fetchPostSuccess(responses[0].data, responses[1].data)))
                .catch(err => console.log(err))
        }
}

export function submitCommentToPost(input, user_id, post_id) {
        return dispatch => {
                axios.post("http://127.0.0.1:4000/comments/post", {
                        postId: [post_id],
                        context: input,
                        commentedBy: [user_id],
                })
                .then(function (response){
                        console.log(response)

                })
                .catch(function (err) {
                        console.log(err);
                })
        }
}

export const submitCommentToPostSuccess = () => ({
        type: "SUBMIT_COMMENT_TO_POST_SUCCESS",

})

export const fetchPostSuccess = (post, comments) => ({
        type: "FETCH_POST_SUCCESS",
        payload: { post, comments }
});

export const fetchPostFailure = error => ({
        type: "FETCH_POST_FAILURE",
        payload: { error }
});
