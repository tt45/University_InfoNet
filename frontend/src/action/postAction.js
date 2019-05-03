import axios from 'axios';

export function fetchPosts(user_id, university) {
        console.log(user_id, university);
        console.log(typeof(user_id), typeof(university))
  return dispatch => {
    return axios.post("https://cs498-infonet.herokuapp.com/posts", {
                    university: university,
    })
      .then(function (response) {
              console.log(response);
              dispatch(fetchPostsSuccess(response.data.data));
      })
      .catch(function (error) {
              console.log(error);
              dispatch(fetchPostsFailure(error))
      });
  };
}

export function createPost(user_id, title, category, context, university) {
        return dispatch => {
                return axios.post("https://cs498-infonet.herokuapp.com/posts/createPost", {
                                postedBy: user_id,
                                title: title,
                                category: category,
                                context: context,
                        })
                        .then(function (response) {
                                console.log(response)
                                dispatch(fetchPosts(user_id, university))
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
