import axios from 'axios';

export function fetchPost(post_id) {
  return dispatch => {
    return axios.get("http://127.0.0.1:4000/posts/"+post_id, {

    })
      .then(function (response) {
              dispatch(fetchPostSuccess(response.data.data));
              console.log(response.data.data, 'fetch detail')
      })
      .catch(function (error) {
              console.log(error);
              dispatch(fetchPostFailure(error))
      });
  };
}

export function fetchPostComment(comment_arr) {
        var comment_objects = [];
        return dispatch => {
                console.log('fetch comments with post')
                Promise.all(
                        comment_arr.map(comment_id=>
                                axios.get("http://127.0.0.1:4000/comments/"+comment_id)
                                .then(function(response) {
                                        console.log(response)
                                })
                                .catch(function(err) {
                                        console.log(err);
                                })
                        )
                ).then(responses =>
                        console.log(responses)

                ).catch()
        }
}

export const fetchPostSuccess = post => ({
        type: "FETCH_POST_SUCCESS",
        payload: { post }
});

export const fetchPostFailure = error => ({
        type: "FETCH_POST_FAILURE",
        payload: { error }
});
