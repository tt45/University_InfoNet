import axios from 'axios';

export function fetchUser() {
  return dispatch => {
    return axios.get("http://127.0.0.1:4000/users/5cc52a5d6a1223f5130504d9", {

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

export const fetchUserSuccess = user => ({
  type: "FETCH_USER_SUCCESS",
  payload: { user }
});

export const fetchUserFailure = error => ({
  type: "FETCH_USER_FAILURE",
  payload: { error }
});
