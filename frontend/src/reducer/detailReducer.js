const initialState = {
        post: {},
}

function detailReducer(state = initialState, action) {
        switch (action.type) {
                case "FETCH_POST_SUCCESS":
                        return {post: action.payload.post}
                case "FETCH_POST_ERROR":

                        return state;

                default:
                        return state;
        }
};

export default detailReducer;
