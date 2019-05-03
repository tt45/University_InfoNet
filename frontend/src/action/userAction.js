import axios from 'axios';
import history from '../history';
//import { push } from 'react-router-redux';

export function fetchUser(user_id) {
  return dispatch => {
    return axios.get("http://127.0.0.1:4000/users/"+user_id, {

    })
      .then(function (response) {
              dispatch(fetchUserSuccess(response.data.data));
              console.log(response.data.data)
      })
      .catch(function (error) {
              console.log(error);
              dispatch(fetchUserFailure(error))
      });
  };
}

export function fetchOwnPost(user_id) {
  return dispatch => {
    return axios.get("http://127.0.0.1:4000/posts/user/"+user_id, {

    })
      .then(function (response) {
              dispatch(fetchOwnPostSuccess(response.data.data))
              console.log(response)
      })
      .catch(function (error) {
              console.log(error);
              dispatch(fetchUserFailure(error))
      });
  };
}

export function fetchLikePost(user_id) {
        console.log(user_id);
  return dispatch => {
    return axios.get("http://127.0.0.1:4000/users/liked/posts/"+user_id, {

    })
      .then(function (response) {
              dispatch(fetchOwnLikeSuccess(response.data.data))
              console.log(response)
      })
      .catch(function (error) {
              console.log(error);
              dispatch(fetchUserFailure(error))
      });
  };
}

export function logIn(email, password) {
        return dispatch => {
                return axios.post("http://127.0.0.1:4000/users/login", {
                            email: email,
                            password: password,
                        })
                        .then(function (response) {
                                console.log(response.data.user)
                                dispatch(fetchUserSuccess(response.data.user));
                                //dispatch(push('/home'));
                                //dispatch(push('/home'));
                                if (response.data.user) {
                                        history.push('/home');
                                }

                                //browserHistory.push('/home');
                                //accountObj = response["data"]["user"];
                        })
                        .catch(function (err) {
                                console.log(err);
                        })
        }
}


export function signUp(email, username, password, university, first, last, major, classStanding) {
        console.log(email, username, password, university, first, last, major, classStanding)
        return dispatch => {
                return axios.post("http://127.0.0.1:4000/users/signup", {
                            email: email,
                            username: username,
                            password: password,
                            university: university,
                            firstName: first,
                            lastName: last,
                            major: major,
                            year: classStanding,
                            //expectedGraduation: "2019-04-23T12:05:36.000+00:00",
                        })
                        .then(function (response) {
                                console.log(response)
                        })
                        .catch(function (err) {
                                console.log(err);
                        })
        }
}

export const fetchOwnPostSuccess = own_posts => ({
        type: "FETCH_OWN_POST_SUCCESS",
        payload: {own_posts}
})

export const fetchOwnLikeSuccess = like_posts => ({
        type: "FETCH_LIKE_POST_SUCCESS",
        payload: {like_posts}
})

export const fetchUserSuccess = user => ({
  type: "FETCH_USER_SUCCESS",
  payload: { user }
});

export const fetchUserFailure = error => ({
  type: "FETCH_USER_FAILURE",
  payload: { error }
});
