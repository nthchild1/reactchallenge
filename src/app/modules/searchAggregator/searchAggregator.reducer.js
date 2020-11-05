import actionTypes from './searchAggregator.actionTypes';

const initialState = {
    selectedSearchEngine: undefined,
    searchResults: [],
    searchString: undefined
};

const searchAggregatorReducer = (state = initialState, action) => {
    let newState = {...state};

    switch (action.type) {
        case actionTypes.SET_SEARCH_ENGINE:
            newState = {
                ...state,
                selectedSearchEngine: action.payload,
            };
            break;
        case actionTypes.SET_SEARCH_RESULTS:
            newState = {
                ...state,
                searchResults: action.payload,
            };
            break;
        case actionTypes.SET_SEARCH_STRING:
            newState = {
                ...state,
                searchString: action.payload,
            };
            break;
        default:
            break;
    }

    return newState;
};

export default searchAggregatorReducer;
