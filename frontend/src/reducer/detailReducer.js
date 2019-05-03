const initialState = {
        post: {},
        comments: [],
}

function detailReducer(state = initialState, action) {
        switch (action.type) {
                case "FETCH_POST_SUCCESS":
                        return {...state, post: action.payload.post, comments: action.payload.comments}
                case "FETCH_POST_ERROR":
                        return state;
                default:
                        return state;
        }
};

export default detailReducer;
