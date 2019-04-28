import axios from 'axios';

export function fetchPosts() {
  return dispatch => {
    return axios.get("http://127.0.0.1:4000/posts", {

    })
      .then(function (response) {
              dispatch(fetchPostsSuccess(response.data.data));
              console.log(response.data.data, 'fetch posts')
      })
      .catch(function (error) {
              console.log(error);
              dispatch(fetchPostsFailure(error))
      });
  };
}

export const fetchPostsSuccess = posts => ({
        type: "FETCH_POSTS_SUCCESS",
        payload: { posts }
});

export const fetchPostsFailure = error => ({
        type: "FETCH_POSTS_FAILURE",
        payload: { error }
});

export const filterPosts = (category) => ({
        type: "FILTER_POSTS",
        payload: {category}
})

export const searchPosts = (input) => ({
        type: "SEARCH_POSTS",
        payload: {input}
})
