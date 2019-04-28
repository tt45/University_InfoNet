const initialState = {
        posts: [],
        filter_category: '',
        search_input: '',
}

function postReducer(state=initialState, action) {
        switch (action.type){
                case "FETCH_POSTS_SUCCESS":
                        console.log('fetch post success')
                        return {
                                ...state,
                                posts: action.payload.posts
                        };
                case "FETCH_POSTS_FAILURE":
                        console.log('fetch post fail')
                        return state;

                case "FILTER_POSTS":
                        return {
                                ...state,
                                filter_category: action.payload.category,
                        };

                case "SEARCH_POSTS":
                        return {
                                ...state,
                                search_input: action.payload.input,
                        }
                default:
                        return state;
        }

}

export default postReducer;
