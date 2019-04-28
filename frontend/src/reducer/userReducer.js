const initialState = {
        user: {},
        loggedIn: false,
};

function userReducer(state = initialState, action) {
        switch (action.type) {
                case "FETCH_USER_SUCCESS":
                        return {user: action.payload.user}
                case "FETCH_USER_ERROR":

                        return state;

                default:
                        return state;
        }
};

export default userReducer;
