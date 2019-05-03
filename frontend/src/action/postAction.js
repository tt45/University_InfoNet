import axios from 'axios';

export function fetchPosts(user_id, university) {
  return dispatch => {
    return axios.get("https://cs498-infonet.herokuapp.com/posts", {
            _id: user_id,
            university: university,
    })
      .then(function (response) {
              dispatch(fetchPostsSuccess(response.data.data));
      })
      .catch(function (error) {
              console.log(error);
              dispatch(fetchPostsFailure(error))
      });
  };
}

export function createPost(user_id, title, category, context) {
        return dispatch => {
                return axios.post("https://cs498-infonet.herokuapp.com/posts", {
                                postedBy: user_id,
                                title: title,
                                category: category,
                                context: context,
                        })
                        .then(function (response) {
                                console.log(response)
                                dispatch(fetchPosts())
                        })
                        .catch(function (err) {
                                console.log(err);
                        })
        }
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
