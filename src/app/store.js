import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './modules';

const buildStore = () => {
    const persistedReducer = reducer;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleware = [thunk];
    const composedMiddleware = applyMiddleware(...middleware);
    const initialState = {};

    return createStore(
        persistedReducer,
        initialState,
        composeEnhancers(composedMiddleware),
    );
};

export default buildStore;
