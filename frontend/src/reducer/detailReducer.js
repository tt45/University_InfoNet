const initialState = {
        post: {},
        comments: [],
}

function detailReducer(state = initialState, action) {
        switch (action.type) {
                case "FETCH_POST_SUCCESS":
                        return {post: action.payload.post}
                case "FETCH_POST_ERROR":

                        return state;
                case "FETCH_POST_COMMENT":
                        return {...state, comments: action.payload.comments}
                default:
                        return state;
        }
};

export default detailReducer;
