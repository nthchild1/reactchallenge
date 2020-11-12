import actionTypes from './app.actionTypes';

const initialState = {
    loading: false,
    FETCH_INIT: false,
    FETCH_SUCCESS: false,
    FETCH_ERROR: false,
    error: null,
};

const appReducer = (state = initialState, action) => {
    let newState = {...state};

    switch (action.type) {
        case actionTypes.SET_STATE:
            newState = {
                ...state,
                [action.payload.property]: action.payload.value,
            };
            break;
        case actionTypes.SET_FETCH_INIT:
            newState = {
                ...state,
                FETCH_INIT: true,
                FETCH_SUCCESS: false,
                FETCH_ERROR: false,
            };
            break;
        case actionTypes.SET_FETCH_SUCCESS:
            newState = {
                ...state,
                FETCH_INIT: false,
                FETCH_SUCCESS: true,
                FETCH_ERROR: false,
            };
            break;
        case actionTypes.SET_FETCH_ERROR:
            newState = {
                ...state,
                FETCH_INIT: false,
                FETCH_SUCCESS: false,
                FETCH_ERROR: true,
                error: action.payload
            };
            break;
        default:
            break;
    }

    return newState;
};

export default appReducer;
