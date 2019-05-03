const initialState = {
        user: {},
        loggedIn: false,
        like_posts: [],
        own_posts: [],
};

function userReducer(state = initialState, action) {
        switch (action.type) {
                case "FETCH_USER_SUCCESS":
                        return {...state, user: action.payload.user, loggedIn: true}
                case "FETCH_USER_ERROR":

                        return state;
                case "FETCH_LIKE_POST_SUCCESS":
                        return {...state, like_posts: action.payload.like_posts}
                case "FETCH_OWN_POST_SUCCESS":
                        return {...state, own_posts: action.payload.own_posts}
                default:
                        return state;
        }
};

export default userReducer;
